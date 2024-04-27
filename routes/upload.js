const express = require("express");
const {
  uploadProfile,
  getProfilePicture
} = require("../controllers/upload");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.put("/profile", protect, authorize('admin', 'user'), uploadProfile);
router.get("/profile", protect, authorize('admin', 'user'), getProfilePicture);

module.exports=router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         profilePic:
 *           type: string
 *           description: URL of the user's profile picture.
 *         user:
 *           type: string
 *           description: The ID of the user associated with the profile.
 *       required:
 *         - user
 */

/**
 * @swagger
 * /api/v1/upload/profile:
 *   put:
 *     summary: Upload profile picture
 *     tags: [Upload]
 *     description: Upload or update the profile picture for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pic:
 *                 type: string
 *             required:
 *               - pic
 *     responses:
 *       '200':
 *         description: Profile picture uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/upload/profile:
 *   get:
 *     summary: Get profile picture
 *     tags: [Upload]
 *     description: Retrieve the profile picture for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile picture retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '404':
 *         description: Profile picture not found.
 *       '500':
 *         description: Internal server error.
 */