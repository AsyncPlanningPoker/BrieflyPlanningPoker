class CustomError extends Error {
  public message: string;
  constructor(message: string) {
    super();
    this.message = message;
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
