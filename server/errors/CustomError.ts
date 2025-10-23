export class CustomError extends Error {
  httpStatusCode: number;
  meta: object;

  constructor(httpStatusCode: number, message: string, meta: object) {
    if (message) {
      super(message);
    } else {
      super('A generic error occurred!');
    }

    this.httpStatusCode = httpStatusCode;
    this.meta = meta;

    Error.captureStackTrace(this, this.constructor);
  }
}
