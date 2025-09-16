import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/environment';

export interface JwtPayload {
  userId: string;
  email: string;
  username: string;
}

export const generateToken = (payload: JwtPayload): string => {
  const exp: string | number = config.jwtExpiresIn || '24h';
  // NOTE: Workaround for jsonwebtoken type overload mismatch under exactOptionalPropertyTypes
  return (jwt as any).sign(payload, config.jwtSecret, { expiresIn: exp } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwtSecret as string) as JwtPayload;
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  const exp: string | number = config.jwtRefreshExpiresIn || '7d';
  return (jwt as any).sign(payload, config.jwtRefreshSecret, { expiresIn: exp } as SignOptions);
};
