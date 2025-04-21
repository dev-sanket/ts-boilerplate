import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { verifyToken } from '@clerk/backend';
import { errorTypes, logger } from '../utils';

const { UnauthorizedError } = errorTypes;
// Middleware to verify the token
export const verifyClerkJWTToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Unauthorized: No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify the session token
    const decodedJwt = await verifyToken(token, {
      jwtKey: process.env.CLERK_JWT_PUBLIC_KEY,
    });

    if (!decodedJwt) {
      throw new UnauthorizedError('Unauthorized: Invalid token');
    }
    // Add the session and user to the request object
    // Add the session and user to the request object
    req.session = decodedJwt;
    req.userId = decodedJwt.sub;

    // Get the user information from the Clerk API
    req.user = await clerkClient.users.getUser(decodedJwt.sub);
    next();
  } catch (error) {
    logger.error('Token verification error:', error);
    next(new UnauthorizedError('Unauthorized: Invalid token'));
  }
};
