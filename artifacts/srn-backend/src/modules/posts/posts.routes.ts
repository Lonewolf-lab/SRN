import { Router } from 'express';
import * as postsController from './posts.controller';
import { validate } from '../../middleware/validate';
import { protect } from '../../middleware/auth';
import { restrictTo } from '../../middleware/role';
import { createPostSchema } from './posts.validation';

const router = Router();

// Notice we need protect optionally for getPostById if it handles premium,
// but for simplicity, we let the controller handle it or make it partially public.
/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts (Paginated)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPostById);

// Create Post (Admin/Member only - but for now restricted to Admin as per requirement)
router.post('/', protect, restrictTo('ADMIN'), validate(createPostSchema), postsController.createPost);

// Update/Delete Post (Protected - authorship checked in service)
router.put('/:id', protect, validate(createPostSchema), postsController.updatePost);
router.delete('/:id', protect, postsController.deletePost);

export default router;
