import { Request, Response } from 'express';
import * as membershipService from './membership.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../utils/response';

export const getMyMembership = catchAsync(async (req: Request, res: Response) => {
  const membership = await membershipService.getMembership(req.user.id);
  sendSuccess(res, membership, 'Membership details fetched successfully');
});

export const cancelMyMembership = catchAsync(async (req: Request, res: Response) => {
  const result = await membershipService.cancelMembership(req.params.id as string, req.user.id);
  sendSuccess(res, result, 'Membership cancelled successfully');
});

export const getAllMemberships = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const result = await membershipService.getAllMemberships(page, limit);
  sendSuccess(res, result, 'All memberships fetched successfully');
});
