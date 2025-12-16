import { CustomError } from '../errors/CustomError.js';
import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(err);
  }

  let httpStatusCode = 500;
  let message = 'Internal Server Error';
  let meta: object = {};

  if (err instanceof CustomError) {
    httpStatusCode = err.httpStatusCode;
    message = err.message;
    meta = err.meta;
  } else {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof err === 'string') {
        message = err;
      } else if (err instanceof Error) {
        message = err.message;
      }
    }
  }

  let stackTrace = undefined;

  if (process.env.NODE_ENV !== 'production') {
    stackTrace = err.stack;
  }

  console.error(err);

  res.status(httpStatusCode).json({
    error: {
      message: message,
      meta: meta,
      stackTrace: stackTrace,
    },
  });
}
