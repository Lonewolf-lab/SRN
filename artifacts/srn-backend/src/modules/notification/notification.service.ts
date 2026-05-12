import { prisma } from '../../lib/prisma';

export const createNotification = async (userId: string, title: string, message: string) => {
  return await prisma.notification.create({
    data: {
      userId,
      title,
      message,
    },
  });
};

export const getNotifications = async (userId: string) => {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const markAsRead = async (id: string, userId: string) => {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.userId !== userId) {
    throw new Error('Notification not found');
  }

  return await prisma.notification.update({
    where: { id },
    data: { read: true },
  });
};

export const markAllAsRead = async (userId: string) => {
  return await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
};
