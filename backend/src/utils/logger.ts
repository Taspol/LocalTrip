import winston from 'winston';
import { config } from '../config/environment';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

// Add colors to winston
winston.addColors(colors);

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Define console format for development
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} [${level}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create transports array
const transports: winston.transport[] = [];

// Console transport for development
if (config.nodeEnv === 'development') {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: config.logLevel,
    })
  );
} else {
  // Console transport for production (JSON format)
  transports.push(
    new winston.transports.Console({
      format: logFormat,
      level: config.logLevel,
    })
  );
}

// File transports for production
if (config.nodeEnv === 'production') {
  // Error log file
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: logFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );

  // Combined log file
  transports.push(
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: logFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

// Create logger instance
export const logger = winston.createLogger({
  level: config.logLevel,
  levels,
  format: logFormat,
  transports,
  exitOnError: false,
});

// Add request ID support for request tracing
export const addRequestId = (requestId: string) => {
  return logger.child({ requestId });
};

// Helper functions for common logging patterns
export const logError = (error: Error, context?: string) => {
  logger.error(context ? `${context}: ${error.message}` : error.message, {
    stack: error.stack,
    name: error.name,
  });
};

export const logRequest = (method: string, url: string, statusCode: number, responseTime: number) => {
  logger.info('HTTP Request', {
    method,
    url,
    statusCode,
    responseTime: `${responseTime}ms`,
  });
};

export const logDatabase = (operation: string, collection: string, duration?: number) => {
  logger.debug('Database Operation', {
    operation,
    collection,
    duration: duration ? `${duration}ms` : undefined,
  });
};

export const logAuth = (action: string, userId?: string, email?: string) => {
  logger.info('Authentication', {
    action,
    userId,
    email,
  });
};

export const logAI = (operation: string, model: string, duration?: number, tokens?: number) => {
  logger.info('AI Operation', {
    operation,
    model,
    duration: duration ? `${duration}ms` : undefined,
    tokens,
  });
};

// Export default logger
export default logger;
