import { Router } from 'express';
import * as adminController from './admin.controller';
import { protect } from '../../middleware/auth';
import { restrictTo } from '../../middleware/role';

const router = Router();

// Only ADMIN can access these routes
router.use(protect, restrictTo('ADMIN'));

router.get('/users', adminController.getUsers);
router.patch('/users/:id/ban', adminController.banUser);
router.get('/analytics', adminController.getAnalytics);

export default router;
