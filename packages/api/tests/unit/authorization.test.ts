import * as auth from '../../src/middlewares/authorization/authorization';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Authorization', () => {
  test('Should create a new token', async () => {
    const value = 'test';
    const token = auth.create(value, 'login');
    expect(token).not.toBeUndefined;
    expect(token).not.toBeNull;
  });

  test('Should verify a token', async () => {
    const value = 'test';
    const token = auth.create(value, 'login');
    const verify = auth.verify(token);
    expect(verify).toStrictEqual({ email: value, role: 'login' });
  });

  test('Should not verify a token', async () => {
    const value = 'test';
    const token = await auth.create(value, 'login');
    const verify = await auth.verify(token.concat('123'));
    expect(verify).toBeUndefined;
  });
});
