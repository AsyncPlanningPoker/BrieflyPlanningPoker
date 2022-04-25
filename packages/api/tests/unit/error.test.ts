import * as error from '../../src/middlewares/error/error';

describe('Error', () => {
  test('Should create a new BadRequest instance', async () => {
    const badRequest = new error.BadRequest('error');
    expect(badRequest.message).toBe('error');
    expect(badRequest.getCode()).toBe(400);
  });

  test('Should create a new NotFound instance', async () => {
    const notFound = new error.NotFound('error');
    expect(notFound.message).toBe('error');
    expect(notFound.getCode()).toBe(404);
  });

  test('Should create a new Unauthorized instance', async () => {
    const unauthorized = new error.Unauthorized('error');
    expect(unauthorized.message).toBe('error');
    expect(unauthorized.getCode()).toBe(401);
  });

  test('Should create a new error instance', async () => {
    const internalError = new error.CustomError('error');
    expect(internalError.message).toBe('error');
    expect(internalError.getCode()).toBe(500);
  });
});
