import { prisma } from '../../lib/prisma';
import * as membershipService from '../membership/membership.service';

export const createOrder = async (userId: string, amount: number) => {
  // In a real app, this is where you call Razorpay/Stripe API
  // const order = await razorpay.orders.create({ amount, currency: "INR" });
  
  return await prisma.payment.create({
    data: {
      userId,
      amount,
      status: 'PENDING',
      provider: 'RAZORPAY',
      transactionId: `order_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    },
  });
};

export const verifyPayment = async (paymentId: string, userId: string) => {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment || payment.userId !== userId) {
    throw new Error('Payment record not found');
  }

  // In a real app, verify signature from gateway here
  
  return await prisma.$transaction(async (tx: any) => {
    // 1. Update payment status
    const updatedPayment = await tx.payment.update({
      where: { id: paymentId },
      data: { status: 'SUCCESS' },
    });

    // 2. Activate membership (e.g. 1 year for 999 INR)
    // Simple logic: if amount >= 999 then 12 months, else 1 month
    const duration = payment.amount >= 999 ? 12 : 1;
    await membershipService.subscribeUser(userId, 'PREMIUM', duration, tx);

    return updatedPayment;
  });
};
