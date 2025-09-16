import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/environment';

const app = express();
const port = 5051;

// CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hiking App API Documentation',
      version: '1.0.0',
      description: 'RESTful API for the Hiking Trail Application with interactive testing capabilities',
      contact: {
        name: 'API Support',
        email: 'support@hikingapp.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Main API Server',
      },
      {
        url: 'http://localhost:5051',
        description: 'Documentation Server',
      },
      {
        url: 'https://your-api-domain.com',
        description: 'Production Server (Coming Soon)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token here',
        },
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
          description: 'API key for accessing protected endpoints',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
            message: {
              type: 'string',
              description: 'Detailed error description',
            },
            statusCode: {
              type: 'number',
              description: 'HTTP status code',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique user identifier',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            username: {
              type: 'string',
              description: 'User display name',
            },
            profilePicture: {
              type: 'string',
              description: 'URL to user profile picture',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
            },
          },
        },
        Trip: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique trip identifier',
            },
            title: {
              type: 'string',
              description: 'Trip title',
            },
            description: {
              type: 'string',
              description: 'Trip description',
            },
            destination: {
              type: 'string',
              description: 'Trip destination',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Trip start date',
            },
            endDate: {
              type: 'string',
              format: 'date',
              description: 'Trip end date',
            },
            difficulty: {
              type: 'string',
              enum: ['easy', 'moderate', 'hard', 'expert'],
              description: 'Trip difficulty level',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Trip tags',
            },
            userId: {
              type: 'string',
              description: 'ID of the user who created the trip',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Trip creation timestamp',
            },
          },
        },
        Trail: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique trail identifier',
            },
            name: {
              type: 'string',
              description: 'Trail name',
            },
            location: {
              type: 'object',
              properties: {
                latitude: {
                  type: 'number',
                  description: 'Trail latitude',
                },
                longitude: {
                  type: 'number',
                  description: 'Trail longitude',
                },
                address: {
                  type: 'string',
                  description: 'Trail address',
                },
              },
            },
            difficulty: {
              type: 'string',
              enum: ['easy', 'moderate', 'hard', 'expert'],
              description: 'Trail difficulty level',
            },
            distance: {
              type: 'number',
              description: 'Trail distance in kilometers',
            },
            elevation: {
              type: 'number',
              description: 'Trail elevation gain in meters',
            },
            estimatedTime: {
              type: 'string',
              description: 'Estimated completion time',
            },
            features: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Trail features (e.g., waterfall, viewpoint)',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Average trail rating',
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Trail image URLs',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/models/*.ts',
    './src/swagger-docs/*.ts',
    './swagger-docs/*.ts',
  ],
};

// Generate swagger specs
const specs = swaggerJsdoc(swaggerOptions);

// Custom CSS for better UI
const customCss = `
  .swagger-ui .topbar { display: none; }
  .swagger-ui .info { margin: 50px 0; }
  .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
  .swagger-ui .btn.authorize { background-color: #007bff; border-color: #007bff; }
  .swagger-ui .btn.authorize:hover { background-color: #0056b3; border-color: #0056b3; }
`;

// Setup swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss,
  customSiteTitle: 'Hiking App API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
  },
}));

// Root route
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Health check for the docs server
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'API Documentation Server',
    port: port,
    timestamp: new Date().toISOString(),
  });
});

// Specs endpoint for programmatic access
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Start the documentation server
app.listen(port, () => {
  console.log(`📚 API Documentation Server running on http://localhost:${port}`);
  console.log(`🔗 Swagger UI: http://localhost:${port}/api-docs`);
  console.log(`📄 API Specs: http://localhost:${port}/api-docs.json`);
  console.log(`🏥 Health Check: http://localhost:${port}/health`);
});

export default app;
