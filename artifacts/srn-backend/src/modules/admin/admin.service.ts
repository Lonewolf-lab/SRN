import { prisma } from '../../lib/prisma';

/**
 * Fetches all users with pagination
 */
export const getAllUsers = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        isVerified: true,
        avatar: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Bans or unbans a user by their ID
 */
export const toggleUserBan = async (userId: string, banStatus: boolean) => {
  // Check if user exists first for better error handling
  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!existingUser) {
    throw new Error('User not found');
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { isActive: !banStatus },
    select: { id: true, name: true, isActive: true, role: true },
  });

  return user;
};

/**
 * Fetches platform-wide analytics
 */
export const getAnalytics = async () => {
  const [totalUsers, totalMembers, totalPosts, totalEvents, totalPayments] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'MEMBER' } }),
    prisma.post.count(),
    prisma.event.count(),
    prisma.payment.count({ where: { status: 'SUCCESS' } }),
  ]);

  return {
    totalUsers,
    totalMembers,
    totalPosts,
    totalEvents,
    totalPayments,
  };
};

