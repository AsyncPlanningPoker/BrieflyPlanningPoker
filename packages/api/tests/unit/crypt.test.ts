import * as crypt from '../../src/utils/crypt';

describe('Crypt', () => {
  test('Should encrypt a string', async () => {
    const value = 'test';
    const res = await crypt.create(value);
    expect(res).not.toBeUndefined;
    expect(res).not.toBeNull;
    expect(res).not.toBe(value);
  });

  test('Should compare a string with its hash', async () => {
    const value = 'test';
    const res = await crypt.create(value);
    const compare = await crypt.compare(value, res);
    expect(compare).toBeTruthy;
  });

  test('Should compare a string with a wrong hash', async () => {
    const value = 'test';
    const res = await crypt.create(value);
    const compare = await crypt.compare('test-wrong', res);
    expect(compare).toBeFalsy;
  });
});
