import request from 'supertest';
import app from '../index';

describe('Health Check', () => {
  it('should return 200 and a success message from root', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('SRN Backend API is running');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/v1/unknown');
    expect(res.statusCode).toEqual(404);
  });
});
