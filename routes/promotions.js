const express = require("express");
const {
    addPromotion,
    deletePromotion,
    getPromotions,
    getPromotion
} = require("../controllers/promotions");

//Include other recource routers

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");


router
  .route("/")
  .post(protect, authorize("admin"), addPromotion)
  .get(getPromotions);
router
  .route("/:id")
  .delete(protect, authorize("admin"), deletePromotion)
  .get(getPromotion);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Promotion:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the promotion.
 *         rentals:
 *           type: array
 *           items:
 *             type: string  
 *           description: Array of rental IDs associated with the promotion.      
 *         promoType:
 *           type: string
 *           enum: [Simple, Percent]
 *           default: Simple
 *           description: The type of promotion (Simple or Percent).
 *         promoNum:
 *           type: number
 *           description: The value associated with the promotion (e.g., discount amount or percentage).
 *         ratingCount:
 *           type: number
 *           description: The number of ratings received for the promotion.
 *         ratingSum:
 *           type: number
 *           description: The sum of ratings received for the promotion.
 *       required:
 *         - name
 *         - promoType
 */

/**
 * @swagger
 * /api/v1/promotions:
 *   get:
 *     summary: Get all promotions
 *     tags: [Promotions]
 *     description: Retrieve all promotions.
 *     responses:
 *       '200':
 *         description: Promotions retrieved successfully.
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
 *                     $ref: '#/components/schemas/Promotion'
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/promotions/{promoID}:
 *   get:
 *     summary: Get a promotion by ID
 *     tags: [Promotions]
 *     description: Retrieve a promotion by ID.
 *     parameters:
 *       - in: path
 *         name: promoID
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *     responses:
 *       '200':
 *         description: Promotion retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Promotion'
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '404':
 *         description: Promotion not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/promotions:
 *   post:
 *     summary: Create a new promotion
 *     tags: [Promotions]
 *     description: Create a new promotion with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rentals:
 *                 type: array
 *                 items:
 *                   type: string
 *               promoType:
 *                 type: string
 *               promoNum:
 *                 type: number
 *             required:
 *               - name
 *               - rentals
 *               - promoType
 *               - promoNum
 *     responses:
 *       '201':
 *         description: Promotion created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   $ref: '#/components/schemas/Promotion'
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/promotions/{promoID}:
 *   delete:
 *     summary: Delete a promotion
 *     tags: [Promotions]
 *     description: Delete a promotion by ID.
 *     parameters:
 *       - in: path
 *         name: promoID
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *     responses:
 *       '200':
 *         description: Promotion deleted successfully.
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
 *       '400':
 *         description: Bad request. Invalid data provided.
 *       '404':
 *         description: Promotion not found.
 *       '500':
 *         description: Internal server error.
 */