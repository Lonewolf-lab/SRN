import { prisma } from '../lib/prisma';
import { redis } from '../lib/cache';

export const setupTestDB = async () => {
  // Clean database before tests - sequential delete for reliability in restricted environments
  await prisma.notification.deleteMany();
  await prisma.forumComment.deleteMany();
  await prisma.forumThread.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.post.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.user.deleteMany();
};

export const closeConnections = async () => {
  await prisma.$disconnect();
  await redis.quit();
};
