import supertest from 'supertest';
import { server } from '../src/index';

describe('HealthRoute', () => {
  test('Should response with 200 status code', async () => {
    const response = await supertest(server).get('/health');
    expect(response.statusCode).toEqual(200);
  });
});
