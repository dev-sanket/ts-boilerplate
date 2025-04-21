import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';
import { v4 as uuidv4 } from 'uuid';
// Middleware to attach response helper
export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  const reqId = uuidv4();
  req.headers['x-request-id'] = reqId;
  const startTime = Date.now();
  // Store startTime in res.locals instead of req.locals which doesn't exist
  res.locals.startTime = startTime;
  // Add type for response data
  res.locals.sendResponse = <T>(data: T, message = 'Success', status = 200) => {
    return {
      message,
      data,
      status,
    };
  };

  res.locals.sendError = (message = 'Error', status = 500, error?: any) => {
    return {
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
      status,
      errorCode: error?.errorCode || 'UNKNOWN_ERROR',
    };
  };

  next();
};
// Final middleware to send all responses
export const finalResponseHandler = (
  result: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!result || typeof result !== 'object') return next();

  const { message, data, error, status } = result;

  const startTime = res.locals.startTime;
  const responseTime = Date.now() - startTime;

  logger.info(
    `${req.method} ${req.url} - ${responseTime}ms - requestId: ${req.headers['x-request-id']}`
  );

  res.status(status || 200).json({
    message,
    ...(data || (status >= 200 && status < 300)
      ? { data, status }
      : {
          status: status || 500,
          error,
          errorCode: error?.errorCode || 'UNKNOWN_ERROR',
        }),
  });
};
