import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API server
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Backend API is running"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-13T20:12:32.000Z"
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                   example: 1234.567
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 database:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "connected"
 *                     name:
 *                       type: string
 *                       example: "hiking_app"
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Backend API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: 'connected',
      name: 'hiking_app'
    }
  });
});

/**
 * @swagger
 * /api/v1/status:
 *   get:
 *     summary: API status and available routes
 *     description: Returns comprehensive status information and available API routes
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API status and routes information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Backend API is running"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 routes:
 *                   type: object
 *                   properties:
 *                     auth:
 *                       type: string
 *                       example: "/api/v1/auth"
 *                     users:
 *                       type: string
 *                       example: "/api/v1/users"
 *                     trips:
 *                       type: string
 *                       example: "/api/v1/trips"
 *                     trails:
 *                       type: string
 *                       example: "/api/v1/trails"
 *                 server:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                     memory:
 *                       type: object
 *                       properties:
 *                         used:
 *                           type: number
 *                         total:
 *                           type: number
 */
router.get('/status', (req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  
  res.json({
    message: 'Backend API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    routes: {
      health: '/api/v1/health',
      status: '/api/v1/status',
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      trips: '/api/v1/trips',
      trails: '/api/v1/trails',
      guides: '/api/v1/guides',
      search: '/api/v1/search',
      ai: '/api/v1/ai',
      uploads: '/api/v1/uploads',
    },
    server: {
      uptime: process.uptime(),
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024),
      },
      pid: process.pid,
      platform: process.platform,
      nodeVersion: process.version,
    }
  });
});

export default router;
