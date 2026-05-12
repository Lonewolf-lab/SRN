import { Router } from 'express';
import * as eventsController from './events.controller';
import { validate } from '../../middleware/validate';
import { protect } from '../../middleware/auth';
import { restrictTo } from '../../middleware/role';
import { createEventSchema } from './events.validation';

const router = Router();

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: List all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 */
router.get('/', eventsController.getEvents);
router.get('/:id', eventsController.getEventById);

// Protected routes
router.use(protect);
router.post('/:id/register', eventsController.registerForEvent);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, date, location]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               date: { type: string, format: date-time }
 *               location: { type: string }
 *               capacity: { type: integer }
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post('/', protect, restrictTo('ADMIN'), validate(createEventSchema), eventsController.createEvent);

// Admin only routes
router.get('/:id/attendees', restrictTo('ADMIN'), eventsController.getAttendees);

export default router;
