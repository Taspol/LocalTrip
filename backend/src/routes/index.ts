import { Application } from 'express';
import healthRoutes from './health';
import authRoutes from './auth';

// Import route modules (will be created)
// import userRoutes from './users';
// import tripRoutes from './trips';
// import trailRoutes from './trails';
// import guideRoutes from './guides';
// import searchRoutes from './search';
// import aiRoutes from './ai';
// import uploadRoutes from './uploads';

export const setupRoutes = (app: Application): void => {
  // API version prefix
  const apiPrefix = '/api/v1';

  // Health routes (working)
  app.use(apiPrefix, healthRoutes);

  // Authentication routes
  app.use(`${apiPrefix}/auth`, authRoutes);

  // User routes
  // app.use(`${apiPrefix}/users`, userRoutes);

  // Trip routes
  // app.use(`${apiPrefix}/trips`, tripRoutes);

  // Trail routes
  // app.use(`${apiPrefix}/trails`, trailRoutes);

  // Guide routes
  // app.use(`${apiPrefix}/guides`, guideRoutes);

  // Search routes
  // app.use(`${apiPrefix}/search`, searchRoutes);

  // AI routes (speech-to-text, etc.)
  // app.use(`${apiPrefix}/ai`, aiRoutes);

  // Upload routes
  // app.use(`${apiPrefix}/uploads`, uploadRoutes);

  // Placeholder routes for now
  app.get(`${apiPrefix}/placeholder`, (req, res) => {
    res.json({
      message: 'Backend API is running',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      routes: {
        auth: `${apiPrefix}/auth`,
        users: `${apiPrefix}/users`,
        trips: `${apiPrefix}/trips`,
        trails: `${apiPrefix}/trails`,
        guides: `${apiPrefix}/guides`,
        search: `${apiPrefix}/search`,
        ai: `${apiPrefix}/ai`,
        uploads: `${apiPrefix}/uploads`,
      }
    });
  });
};
