import { Request, Response } from 'express';
import * as notificationService from './notification.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendSuccess } from '../../utils/response';

export const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const notifications = await notificationService.getNotifications(req.user.id);
  sendSuccess(res, notifications, 'Notifications fetched successfully');
});

export const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const notification = await notificationService.markAsRead(req.params.id as string, req.user.id);
  sendSuccess(res, notification, 'Notification marked as read');
});

export const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  await notificationService.markAllAsRead(req.user.id);
  sendSuccess(res, null, 'All notifications marked as read');
});
