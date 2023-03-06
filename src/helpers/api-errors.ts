export class ApiErrors extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiErrors {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends ApiErrors {
  constructor(message: string) {
    super(message, 400);
  }
}
