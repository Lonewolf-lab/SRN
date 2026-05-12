import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 'You do not have permission to perform this action', null, 403);
    }
    next();
  };
};
