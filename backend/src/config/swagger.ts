import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { config } from './environment';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.swaggerTitle,
      version: config.swaggerVersion,
      description: config.swaggerDescription,
      contact: {
        name: 'API Support',
        email: 'support@hikingapp.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
      {
  url: 'http://localhost:5051',
  description: 'Standalone API Documentation server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
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
    './src/controllers/*.ts',
  ],
};

export const setupSwagger = (app: Application): void => {
  const specs = swaggerJsdoc(options);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Hiking App API Documentation',
  }));
};
