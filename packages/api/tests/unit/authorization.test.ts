import * as auth from '../../src/utils/authorization';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Authorization', () => {
  test('Should create a new token', async () => {
    const value = 'test';
    const token = auth.create(value);
    expect(token).not.toBeUndefined;
    expect(token).not.toBeNull;
  });

  test('Should verify a token', async () => {
    const value = 'test';
    const token = auth.create(value);
    const verify = auth.verify(token);
    expect(verify).toStrictEqual({ id: value });
  });

  test('Should not verify a token', async () => {
    const value = 'test';
    const token = await auth.create(value);
    const verify = await auth.verify(token.concat('123'));
    expect(verify).toBeUndefined;
  });
});
