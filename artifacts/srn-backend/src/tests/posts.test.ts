import request from 'supertest';
import app from '../index';
import { prisma } from '../lib/prisma';
import { setupTestDB, closeConnections } from './setup';

describe('Posts Module', () => {
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    await setupTestDB();
    
    // Register Admin
    const adminReg = await request(app).post('/api/auth/register').send({ firstName: 'Admin', lastName: 'User', phone: '1234567890', state: 'Delhi', district: 'New Delhi', gender: 'Male', email: 'admin@test.com', password: 'password123' });
    adminToken = adminReg.body.data.accessToken;
    // Manually promote to ADMIN in DB
    await prisma.user.update({ where: { email: 'admin@test.com' }, data: { role: 'ADMIN' } });

    // Register User
    const userReg = await request(app).post('/api/auth/register').send({ firstName: 'User', lastName: 'Test', phone: '0987654321', state: 'Delhi', district: 'New Delhi', gender: 'Female', email: 'user@test.com', password: 'password123' });
    userToken = userReg.body.data.accessToken;
  });

  afterAll(async () => {
    await closeConnections();
  });

  it('should create a post as admin', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test Post',
        content: 'Test Content',
        slug: 'test-post',
        isPremium: false
      });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('Test Post');
  });

  it('should not create a post as regular user', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'User Post',
        content: 'User Content',
        slug: 'user-post'
      });

    expect(res.status).toBe(403);
  });

  it('should get all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(res.body.data.posts.length).toBeGreaterThan(0);
  });

  it('should check premium content access', async () => {
    // Create premium post
    const post = await prisma.post.create({
      data: {
        title: 'Premium Post',
        content: 'Secret Content',
        slug: 'premium-post',
        isPremium: true,
        authorId: (await prisma.user.findUnique({ where: { email: 'admin@test.com' } }))!.id
      }
    });

    // Public access
    const resPublic = await request(app).get(`/api/posts/${post.id}`);
    expect(resPublic.status).toBe(401);

    // Regular user access
    const resUser = await request(app)
      .get(`/api/posts/${post.id}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(resUser.status).toBe(403);

    // Admin access
    const resAdmin = await request(app)
      .get(`/api/posts/${post.id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(resAdmin.status).toBe(200);
  });
});
