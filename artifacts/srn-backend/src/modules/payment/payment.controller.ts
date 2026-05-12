import { Request, Response } from 'express';
import * as paymentService from './payment.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../utils/response';

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await paymentService.createOrder(req.user.id, req.body.amount);
  sendSuccess(res, order, 'Payment order created');
});

export const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.verifyPayment(req.body.paymentId, req.user.id);
  sendSuccess(res, result, 'Payment verified and membership activated');
});
