const express = require("express");
const {
    addFeedback,
    getFeedbacks,
    updateFeedback,
    deleteFeedback,
} = require("../controllers/feedbacks");

//Include other recource routers

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");




router
  .route("/:id")
  .get(getFeedbacks)
  .put(protect, updateFeedback)
  .post(protect, authorize('admin', 'user'), addFeedback)
  .delete(protect, authorize('admin', 'user'), deleteFeedback);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user giving feedback.
 *         promotion:
 *           type: string
 *           description: The ID of the promotion associated with the feedback.
 *         comment:
 *           type: string
 *           description: The comment provided in the feedback.
 *         rating:
 *           type: number
 *           description: The rating given in the feedback (0-5).
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the feedback was created.
 *       required:
 *         - user
 *         - promotion
 *         - rating
 */ 

/**
 * @swagger
 * /api/v1/feedbacks/{promoID}:
 *   post:
 *     summary: Add feedback to a promotion
 *     tags: [Feedbacks]
 *     description: Add feedback to a promotion with the provided comment and rating.
 *     parameters:
 *       - in: path
 *         name: promoID
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *             required:
 *               - comment
 *               - rating
 *     responses:
 *       '201':
 *         description: Feedback added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     feedback:
 *                       $ref: '#/components/schemas/Feedback'
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '404':
 *         description: Promotion not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/feedbacks/{promoID}:
 *   get:
 *     summary: Get feedbacks for a promotion
 *     tags: [Feedbacks]
 *     description: Retrieve all feedbacks associated with a promotion.
 *     parameters:
 *       - in: path
 *         name: promoID
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *     responses:
 *       '200':
 *         description: Feedbacks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Feedback'
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/feedbacks/{feedbackID}:
 *   put:
 *     summary: Update a feedback
 *     tags: [Feedbacks]
 *     description: Update a feedback by ID with the provided comment and rating (user only).
 *     parameters:
 *       - in: path
 *         name: feedbackID
 *         schema:
 *           type: string
 *         required: true
 *         description: Feedback ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *             required:
 *               - comment
 *               - rating
 *     responses:
 *       '200':
 *         description: Feedback updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '401':
 *         description: Unauthorized. User not authorized to update this feedback.
 *       '404':
 *         description: Feedback not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/feedbacks/{feedbackID}:
 *   delete:
 *     summary: Delete a feedback
 *     tags: [Feedbacks]
 *     description: Delete a feedback by ID (user only).
 *     parameters:
 *       - in: path
 *         name: feedbackID
 *         schema:
 *           type: string
 *         required: true
 *         description: Feedback ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Feedback deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *       '401':
 *         description: Unauthorized. User not authorized to delete this feedback.
 *       '404':
 *         description: Feedback not found.
 *       '500':
 *         description: Internal server error.
 */