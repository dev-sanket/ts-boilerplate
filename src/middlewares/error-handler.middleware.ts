import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../utils/errors/base-error';
import { logger, errorTypes } from '../utils';
import { finalResponseHandler } from './responseHandler.middleware';
import { ErrorCode } from '../enums';
import { ApiResponse } from 'src/types';

const { InternalServerError } = errorTypes;

export const errorHandler = (
  data: ApiResponse<unknown> | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (data instanceof Error) {
    // If the error is a custom error we've defined
    if (data instanceof BaseError) {
      const { name, httpCode, errorCode, message, isOperational, context } = data;

      // logger.error({
      //   name,
      //   httpCode,
      //   errorCode,
      //   message,
      //   stack: data.stack,
      //   isOperational,
      //   context,
      //   requestId: req.headers['x-request-id'] || 'unknown'
      // })
      logger.error(`${httpCode} - ${name} - ${errorCode} - ${data.stack}`);

      const errorResponse = res.locals.sendError(message, httpCode, {
        name,
        errorCode,
        context,
        stack: process.env.NODE_ENV === 'development' ? data?.stack : [],
      });

      return next(errorResponse);
    }

    // If the error is unexpected
    const internalError = new InternalServerError(
      'An unexpected error occurred',
      ErrorCode.UNEXPECTED_ERROR,
      {
        originalError: data.message,
      }
    );

    // logger.error({
    //   name: 'UNEXPECTED_ERROR',
    //   httpCode: 500,
    //   errorCode: ErrorCode.UNEXPECTED_ERROR,
    //   message: data.message,
    //   stack: data.stack,
    //   requestId: req.headers['x-request-id'] || 'unknown'
    // })

    logger.error(
      `500 - UNEXPECTED_ERROR - ${ErrorCode.UNEXPECTED_ERROR} - ${data.message} - ${data.stack}`
    );

    const errorResponse = res.locals.sendError(internalError.message, internalError.httpCode, {
      name: internalError.name,
      errorCode: internalError.errorCode,
      stack: process.env.NODE_ENV === 'development' ? data?.stack : [],
    });

    return next(errorResponse);
  }

  return next(data);
};
