const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  deleteUser,
} = require("../controllers/auth");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", logout);
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *         telephone:
 *           type: string
 *           description: The user's telephone number.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         role:
 *           type: string
 *           description: The user's role (user or admin).
 *         point:
 *           type: number
 *           description: The user's points.
 *       required:
 *         - name
 *         - telephone
 *         - email
 *         - role
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authorization]
 *     description: Register a new user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               telephone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - name
 *               - telephone
 *               - email
 *               - password
 *               - role
 *     responses:
 *       '200':
 *         description: User registered successfully.
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in as a user or admin
 *     tags: [Authorization]
 *     description: Log in with the provided email and password to authenticate as a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully.
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *       '400':
 *         description: Bad request. Invalid credentials provided.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user details
 *     tags: [Authorization]
 *     description: Retrieve details of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     summary: Log out user
 *     tags: [Authorization]
 *     description: Log out the currently authenticated user.
 *     responses:
 *       '200':
 *         description: User logged out successfully.
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
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/auth/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Authorization]
 *     description: Delete a user by ID (admin only).
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully.
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
 *         description: Unauthorized. User not authenticated or not an admin.
 *       '400':
 *         description: Bad request. Unable to delete user.
 *       '500':
 *         description: Internal server error.
 */
