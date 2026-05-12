import { prisma } from '../../lib/prisma';

export const subscribeUser = async (userId: string, plan: string, durationInMonths: number) => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + durationInMonths);

  return await prisma.$transaction(async (tx) => {
    // 1. Create membership record
    const membership = await tx.membership.create({
      data: {
        userId,
        plan,
        startDate,
        endDate,
        status: 'ACTIVE',
      },
    });

    // 2. Update user role to MEMBER
    await tx.user.update({
      where: { id: userId },
      data: { role: 'MEMBER' },
    });

    return membership;
  });
};

export const getMembership = async (userId: string) => {
  return await prisma.membership.findFirst({
    where: { userId, status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
  });
};

export const cancelMembership = async (id: string, userId: string) => {
  const membership = await prisma.membership.findUnique({ where: { id } });
  if (!membership || membership.userId !== userId) {
    throw new Error('Membership not found');
  }

  return await prisma.membership.update({
    where: { id },
    data: { status: 'CANCELLED' },
  });
};
