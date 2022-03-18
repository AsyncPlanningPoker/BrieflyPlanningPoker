import supertest from 'supertest';
import app from '../src/index';

describe('HealthRoute', () => {
  test('Should response with 200 status code', async () => {
    const response = await supertest(app).get('/health');
    expect(response.statusCode).toEqual(200);
  });
});
