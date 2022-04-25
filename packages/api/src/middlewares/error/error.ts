import { ValidationError } from 'express-validator';

class CustomError extends Error {
  public message = 'Internal Several Error';
  public json?: ValidationError[];

  constructor(message?: string, json?: ValidationError[]) {
    super();

    this.message = message ?? this.message;
    this.json = json ?? this.json;
  }

  getCode() {
    switch (this.constructor) {
      case BadRequest:
        return 400;
      case NotFound:
        return 404;
      case Unauthorized:
        return 401;
      default:
        return 500;
    }
  }
}

class BadRequest extends CustomError {}
class NotFound extends CustomError {}
class Unauthorized extends CustomError {}

export { CustomError, BadRequest, NotFound, Unauthorized };
