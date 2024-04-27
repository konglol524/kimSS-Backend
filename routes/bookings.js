const express = require('express');
const { getBookings, getBooking, addBooking, updateBooking, deleteBooking } = require('../controllers/bookings');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, getBookings)
    .post(protect, authorize('admin', 'user'), addBooking);
router.route('/:id')
    .get(protect, getBooking)
    .put(protect, authorize('admin', 'user'), updateBooking)
    .delete(protect, authorize('admin', 'user'), deleteBooking);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         bookingDate:
 *           type: string
 *           format: date-time
 *           description: The date of the booking.
 *         user:
 *           type: string
 *           description: The ID of the user making the booking.
 *         car:
 *           type: string
 *           description: The car being booked.
 *         daySpend:
 *           type: number
 *           description: The number of days the car will be rented.
 *         rentalProvider:
 *           type: string
 *           description: The ID of the rental provider.
 *         discountPoint:
 *           type: number
 *           description: The discount points used for the booking.
 *         cost:
 *           type: number
 *           description: The total cost of the booking.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the booking was created.
 *         addedPoint:
 *           type: number
 *           description: The loyalty points added to the user after the booking.
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       '200':
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   get:
 *     summary: Get a single booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The booking details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: body
 *         name: booking
 *         description: The booking object to create
 *         schema:
 *           $ref: '#/components/schemas/Booking'
 *     responses:
 *       '201':
 *         description: The created booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Rental not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   put:
 *     summary: Update a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: booking
 *         description: Updated booking object
 *         schema:
 *           $ref: '#/components/schemas/Booking'
 *     responses:
 *       '200':
 *         description: The updated booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Booking deleted successfully
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
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */