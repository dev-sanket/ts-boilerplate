import { BaseError } from './base-error';

export class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = 500,
    errorCode = 'API_ERROR',
    description = 'Internal Server Error',
    isOperational = true,
    context?: Record<string, any>
  ) {
    super(name, httpCode, errorCode, description, isOperational, context);
  }
}
