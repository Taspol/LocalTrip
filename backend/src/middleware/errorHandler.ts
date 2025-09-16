import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface ErrorWithStatus extends Error {
  statusCode?: number;
  status?: number;
  code?: string | number;
  keyPattern?: Record<string, number>;
}

export const errorHandler = (
  error: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  logger.error('Error handler caught:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: any = {};

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    details = {
      type: 'ValidationError',
      errors: error.message,
    };
  }
  // Mongoose cast error (invalid ObjectId)
  else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
    details = {
      type: 'CastError',
      field: error.message,
    };
  }
  // Mongoose duplicate key error
  else if (error.name === 'MongoServerError' && error.code === 11000) {
    statusCode = 409;
    message = 'Duplicate Entry';
    const field = error.keyPattern ? Object.keys(error.keyPattern)[0] : 'unknown';
    details = {
      type: 'DuplicateError',
      field,
      message: `A record with this ${field} already exists`,
    };
  }
  // JWT errors
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    details = {
      type: 'AuthenticationError',
      message: 'Token is malformed or invalid',
    };
  }
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    details = {
      type: 'AuthenticationError',
      message: 'Token has expired, please login again',
    };
  }
  // Multer file upload errors
  else if (error.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error';
    details = {
      type: 'FileUploadError',
      code: error.code,
      message: error.message,
    };
  }
  // Custom application errors
  else if (error.statusCode || error.status) {
    statusCode = error.statusCode || error.status || 500;
    message = error.message || 'Application Error';
    details = {
      type: 'ApplicationError',
    };
  }
  // Rate limiting errors
  else if (error.message && error.message.includes('Too many requests')) {
    statusCode = 429;
    message = 'Too Many Requests';
    details = {
      type: 'RateLimitError',
      message: 'You have exceeded the rate limit. Please try again later.',
    };
  }

  // Prepare error response
  const errorResponse: any = {
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
    },
  };

  // Add details in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.details = details;
    errorResponse.error.stack = error.stack;
  } else {
    // Only add safe details in production
    if (details.type && details.type !== 'ApplicationError') {
      errorResponse.error.details = {
        type: details.type,
        ...(details.field && { field: details.field }),
        ...(details.message && { message: details.message }),
      };
    }
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

// Custom error classes
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden access') {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
  }
}

// Async error handler wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
