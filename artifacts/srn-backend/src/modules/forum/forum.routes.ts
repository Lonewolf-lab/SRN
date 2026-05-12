import { Router } from 'express';
import * as forumController from './forum.controller';
import { protect } from '../../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/forum/threads:
 *   get:
 *     summary: List all forum threads
 *     tags: [Forum]
 *     responses:
 *       200:
 *         description: List of threads retrieved successfully
 */
router.get('/threads', forumController.getThreads);

router.get('/threads/:id', forumController.getThreadById);

/**
 * @swagger
 * /api/forum/threads:
 *   post:
 *     summary: Create a new forum thread
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: Thread created successfully
 */
router.post('/threads', protect, forumController.createThread);

/**
 * @swagger
 * /api/forum/threads/{threadId}/comments:
 *   post:
 *     summary: Add a comment to a thread
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: Comment added successfully
 */
router.post('/threads/:threadId/comments', protect, forumController.createComment);

export default router;
