import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { config } from './config/environment';
import { connectDB } from './config/database';
import { initializeQdrant } from './config/qdrant';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './config/swagger';
import { setupRoutes } from './routes';
import { setupSocketIO } from './config/socket';

class App {
  public app: express.Application;
  public server: any;
  public io: SocketIOServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: config.corsOrigin,
        methods: ['GET', 'POST']
      }
    });

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeSocketIO();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS
    this.app.use(cors({
      origin: [
        config.corsOrigin,
        'http://localhost:4001', // Allow Swagger UI on same port
        'http://127.0.0.1:4001', // Allow local IP variation
        'http://localhost:5050', // Allow docs server port
        'http://127.0.0.1:5050'  // Allow docs server local IP
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'Accept', 'Origin', 'X-Requested-With']
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: config.rateLimitWindowMs,
      max: config.rateLimitMaxRequests,
      message: {
        error: 'Too many requests from this IP, please try again later.',
        retryAfter: Math.ceil(config.rateLimitWindowMs / 1000)
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use('/api/', limiter);

    // Compression
    this.app.use(compression());

    // Logging
    if (config.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined', {
        stream: { write: (message) => logger.info(message.trim()) }
      }));
    }

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Trust proxy for accurate IP addresses
    this.app.set('trust proxy', 1);
  }

  private initializeRoutes(): void {
  // NOTE: All public API routes (including health + status) are now namespaced under /api/v1
  // The unversioned /health and /api/status endpoints were removed to enforce consistent prefixing.

    // Setup Swagger documentation
    if (config.enableSwagger) {
      setupSwagger(this.app);
    }

    // API routes
    setupRoutes(this.app);

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
        availableEndpoints: '/api/status'
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  private initializeSocketIO(): void {
    setupSocketIO(this.io);
  }

  public async start(): Promise<void> {
    try {
      // Try to connect to MongoDB (but don't fail if it's not available)
      try {
        await connectDB();
        logger.info('✅ MongoDB connected successfully');
      } catch (error) {
        const msg = (error as any)?.message || String(error);
        logger.warn('⚠️ MongoDB connection failed, continuing without database:', msg);
      }

      // Initialize Qdrant vector database (optional)
      if (config.qdrantUrl) {
        try {
          await initializeQdrant();
          logger.info('✅ Qdrant vector database initialized');
        } catch (error) {
          const msg = (error as any)?.message || String(error);
          logger.warn('⚠️ Qdrant initialization failed, continuing without vector search:', msg);
        }
      }

      // Start server
      this.server.listen(config.port, () => {
        logger.info(`🚀 Server running on port ${config.port}`);
        logger.info(`📊 Environment: ${config.nodeEnv}`);
  logger.info(`📚 API Documentation: http://localhost:${config.port}/api-docs`);
  logger.info(`🔗 Health Check: http://localhost:${config.port}/api/v1/health`);
  logger.info(`🔎 Status: http://localhost:${config.port}/api/v1/status`);
        logger.info(`⚡ WebSocket Server: Ready for real-time connections`);
      });

      // Graceful shutdown
      process.on('SIGTERM', this.gracefulShutdown.bind(this));
      process.on('SIGINT', this.gracefulShutdown.bind(this));

    } catch (error) {
      logger.error('❌ Failed to start server:', error as any);
      process.exit(1);
    }
  }

  private async gracefulShutdown(): Promise<void> {
    logger.info('🛑 Received shutdown signal, starting graceful shutdown...');
    
    this.server.close(() => {
      logger.info('✅ HTTP server closed');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      logger.error('❌ Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
const app = new App();
app.start();

export default app;
