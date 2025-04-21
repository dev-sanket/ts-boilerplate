export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, any>;

  constructor(
    name: string,
    httpCode: number,
    errorCode: string,
    description: string,
    isOperational: boolean,
    context?: Record<string, any>
  ) {
    super(description);

    this.name = name;
    this.httpCode = httpCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.context = context;

    Error.captureStackTrace(this);
  }
}
