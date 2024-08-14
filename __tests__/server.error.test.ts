import request from 'supertest'
import app from '../src/app'
import { DataSource } from 'typeorm';

// Mock do DataSource
const mockDataSource = {
  getRepository: jest.fn().mockImplementation(() => {
    throw new Error('Simulated error');
  }),
};

beforeEach(() => {
    // Configura o mock para o DataSource
    app.locals.datasource = mockDataSource as unknown as DataSource;
  });

describe('Internal server error POST /users/', () => {

  it('should return status 500 when there is an internal server error', async () => {
    const response = await request(app).post('/users/').send({
      "name": "mario",
      "email": "mario@email.com"
    })

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal server error');
  });
})

describe('Internal server error DELETE', () => {

  it('should return status 500 when there is an internal server error', async () => {
    const response = await request(app).delete('/users/1')

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error deleting user');
  });
})

describe('Internal server error PUT', () => {

  it('should return status 500 when there is an internal server error', async () => {
    const response = await request(app).put('/users/1').send({
      "name": "nome",
      "email": "nome@email.com"
    })

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal server error');
  });
})