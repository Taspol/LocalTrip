import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Helper function to get environment variable with default
const getEnv = (key: string, defaultValue: string = ''): string => {
  return process.env[key] || defaultValue;
};

// Helper function to get boolean from environment
const getBoolEnv = (key: string, defaultValue: boolean = false): boolean => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

// Helper function to get number from environment
const getNumberEnv = (key: string, defaultValue: number): number => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Validate required environment variables
const validateRequiredEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`  ${key}`));
    process.exit(1);
  }
};

// Validate JWT secrets
const validateJwtSecrets = () => {
  const jwtSecret = getEnv('JWT_SECRET');
  const jwtRefreshSecret = getEnv('JWT_REFRESH_SECRET');
  
  if (jwtSecret.length < 32) {
    console.error('❌ JWT_SECRET must be at least 32 characters long');
    process.exit(1);
  }
  
  if (jwtRefreshSecret.length < 32) {
    console.error('❌ JWT_REFRESH_SECRET must be at least 32 characters long');
    process.exit(1);
  }
};

// Validate environment on startup
validateRequiredEnv();
validateJwtSecrets();

// Export configuration
export const config = {
  // Server Configuration
  nodeEnv: getEnv('NODE_ENV', 'development'),
  port: getNumberEnv('PORT', 5000),
  apiVersion: getEnv('API_VERSION', 'v1'),
  
  // Database Configuration
  mongodbUri: getEnv('MONGODB_URI'),
  mongodbDbName: getEnv('MONGODB_DB_NAME', 'WildGuide'),
  
  // Vector Database Configuration
  qdrantUrl: getEnv('QDRANT_URL'),
  qdrantApiKey: getEnv('QDRANT_API_KEY'),
  qdrantCollectionName: getEnv('QDRANT_COLLECTION_NAME', 'hiking_embeddings'),
  
  // Authentication Configuration
  jwtSecret: getEnv('JWT_SECRET'),
  jwtExpiresIn: getEnv('JWT_EXPIRES_IN', '24h'),
  jwtRefreshSecret: getEnv('JWT_REFRESH_SECRET'),
  jwtRefreshExpiresIn: getEnv('JWT_REFRESH_EXPIRES_IN', '7d'),
  
  // OAuth Configuration
  googleClientId: getEnv('GOOGLE_CLIENT_ID'),
  googleClientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
  googleCallbackUrl: getEnv('GOOGLE_CALLBACK_URL'),
  
  // OpenAI Configuration
  openaiApiKey: getEnv('OPENAI_API_KEY'),
  openaiModel: getEnv('OPENAI_MODEL', 'gpt-4'),
  whisperModel: getEnv('WHISPER_MODEL', 'whisper-1'),
  
  // ColPali/ColiVara Configuration
  colpaliApiKey: getEnv('COLPALI_API_KEY'),
  colpaliApiUrl: getEnv('COLPALI_API_URL'),
  
  // Google Cloud Configuration
  googleCloudProjectId: getEnv('GOOGLE_CLOUD_PROJECT_ID'),
  googleCloudStorageBucket: getEnv('GOOGLE_CLOUD_STORAGE_BUCKET'),
  googleCloudCredentialsPath: getEnv('GOOGLE_CLOUD_CREDENTIALS_PATH'),
  googleCloudRegion: getEnv('GOOGLE_CLOUD_REGION', 'us-central1'),
  
  // Security Configuration
  corsOrigin: getEnv('CORS_ORIGIN', 'http://localhost:3000'),
  rateLimitWindowMs: getNumberEnv('RATE_LIMIT_WINDOW_MS', 900000), // 15 minutes
  rateLimitMaxRequests: getNumberEnv('RATE_LIMIT_MAX_REQUESTS', 100),
  
  // File Upload Configuration
  maxFileSize: getNumberEnv('MAX_FILE_SIZE', 10485760), // 10MB
  uploadDir: getEnv('UPLOAD_DIR', './uploads'),
  allowedFileTypes: getEnv('ALLOWED_FILE_TYPES', 'image/jpeg,image/png,image/webp,application/pdf').split(','),
  
  // API Documentation
  enableSwagger: getBoolEnv('ENABLE_SWAGGER', true),
  swaggerTitle: getEnv('SWAGGER_TITLE', 'Hiking App API'),
  swaggerDescription: getEnv('SWAGGER_DESCRIPTION', 'RESTful API for the Hiking Trail Application'),
  swaggerVersion: getEnv('SWAGGER_VERSION', '1.0.0'),
  
  // Monitoring and Logging
  logLevel: getEnv('LOG_LEVEL', 'info') as 'error' | 'warn' | 'info' | 'debug',
  enableRequestLogging: getBoolEnv('ENABLE_REQUEST_LOGGING', true),
  
  // Performance Configuration
  cacheTtl: getNumberEnv('CACHE_TTL', 3600), // 1 hour
  apiTimeout: getNumberEnv('API_TIMEOUT', 30000), // 30 seconds
  
  // External Services
  weatherApiKey: getEnv('WEATHER_API_KEY'),
  weatherApiUrl: getEnv('WEATHER_API_URL', 'https://api.openweathermap.org/data/2.5'),
  mapsApiKey: getEnv('MAPS_API_KEY'),
  
  // WebSocket Configuration
  websocketEnabled: getBoolEnv('WEBSOCKET_ENABLED', true),
  websocketCorsOrigin: getEnv('WEBSOCKET_CORS_ORIGIN', 'http://localhost:3000'),
  
  // Database Backup Configuration
  backupEnabled: getBoolEnv('BACKUP_ENABLED', false),
  backupSchedule: getEnv('BACKUP_SCHEDULE', '0 2 * * *'), // Daily at 2 AM
  backupRetentionDays: getNumberEnv('BACKUP_RETENTION_DAYS', 30),
};

// Export individual configuration objects for better organization
export const dbConfig = {
  mongoUri: config.mongodbUri,
  dbName: config.mongodbDbName,
};

export const authConfig = {
  jwtSecret: config.jwtSecret,
  jwtExpiresIn: config.jwtExpiresIn,
  jwtRefreshSecret: config.jwtRefreshSecret,
  jwtRefreshExpiresIn: config.jwtRefreshExpiresIn,
  googleClientId: config.googleClientId,
  googleClientSecret: config.googleClientSecret,
  googleCallbackUrl: config.googleCallbackUrl,
};

export const vectorDbConfig = {
  qdrantUrl: config.qdrantUrl,
  qdrantApiKey: config.qdrantApiKey,
  collectionName: config.qdrantCollectionName,
};

export const aiConfig = {
  openaiApiKey: config.openaiApiKey,
  openaiModel: config.openaiModel,
  whisperModel: config.whisperModel,
  colpaliApiKey: config.colpaliApiKey,
  colpaliApiUrl: config.colpaliApiUrl,
};

export const gcpConfig = {
  projectId: config.googleCloudProjectId,
  storageBucket: config.googleCloudStorageBucket,
  credentialsPath: config.googleCloudCredentialsPath,
  region: config.googleCloudRegion,
};

export const uploadConfig = {
  maxFileSize: config.maxFileSize,
  uploadDir: config.uploadDir,
  allowedFileTypes: config.allowedFileTypes,
};

// Helper functions
export const isProduction = () => config.nodeEnv === 'production';
export const isDevelopment = () => config.nodeEnv === 'development';
export const isTest = () => config.nodeEnv === 'test';
