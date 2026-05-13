import { Router } from 'express';
import * as postsController from './posts.controller';
import { validate } from '../../middleware/validate';
import { protect } from '../../middleware/auth';
import { optionalProtect } from '../../middleware/optionalAuth';
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
router.get('/', optionalProtect, postsController.getPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post by ID or Slug
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Post details
 */
router.get('/:id', optionalProtect, postsController.getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post (Admin only)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, slug]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               slug: { type: string }
 *               isPremium: { type: boolean, default: false }
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post('/', protect, restrictTo('ADMIN'), validate(createPostSchema), postsController.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               slug: { type: string }
 *               isPremium: { type: boolean }
 *     responses:
 *       200:
 *         description: Post updated successfully
 */
router.put('/:id', protect, validate(createPostSchema), postsController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router.delete('/:id', protect, postsController.deletePost);

export default router;
