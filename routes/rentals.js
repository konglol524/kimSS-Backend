const express = require("express");
const {
  createRental,
  getRental,
  getRentals,
  updateRental,
  deleteRental,
} = require("../controllers/rentals");

//Include other recource routers
const bookingRouter = require('./bookings');

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use('/:rentalId/bookings', bookingRouter);

router
  .route("/")
  .get(getRentals)
  .post(protect, authorize("admin"), createRental);
router
  .route("/:id")
  .get(getRental)
  .put(protect, authorize("admin"), updateRental)
  .delete(protect, authorize("admin"), deleteRental);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the rental.
 *         address:
 *           type: string
 *           description: The address of the rental.
 *         cost:
 *           type: number
 *           description: The cost of the rental.
 *         tel:
 *           type: string
 *           description: The telephone number of the rental.
 *         promotions:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of promotion IDs associated with the rental.
 *       required:
 *         - name
 *         - address
 */

/**
 * @swagger
 * /api/v1/rentals:
 *   get:
 *     summary: Get all rentals
 *     tags: [Rentals]
 *     parameters:
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: Fields to select (comma-separated)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Fields to sort by (comma-separated)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       '200':
 *         description: A list of rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/rentals/{id}:
 *   get:
 *     summary: Get a single rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rental to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The rental details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       '404':
 *         description: Rental not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       '201':
 *         description: The created rental
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/rentals/{id}:
 *   put:
 *     summary: Update a rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rental to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       '200':
 *         description: The updated rental
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Rental not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/rentals/{id}:
 *   delete:
 *     summary: Delete a rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rental to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Rental deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {}
 *       '404':
 *         description: Rental not found
 *       '500':
 *         description: Internal server error
 */