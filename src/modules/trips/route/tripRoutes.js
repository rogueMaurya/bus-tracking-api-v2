import express from "express";
import * as TripController from "../controller/tripController.js";
import {
  verifyToken,
  authorizeRoles,
} from "../../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: API endpoints for scheduling trips
 */

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: List of all trips
 */
router.get("/", TripController.getAllTrips);

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trip found
 *       404:
 *         description: Trip not found
 */
router.get("/:id", TripController.getTripById);

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bus_id
 *               - route_id
 *               - trip_date
 *               - departure_time
 *               - arrival_time
 *             properties:
 *               bus_id:
 *                 type: integer
 *                 example: 1
 *               route_id:
 *                 type: integer
 *                 example: 1
 *               trip_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-10-10
 *               departure_time:
 *                 type: string
 *                 example: "08:00"
 *               arrival_time:
 *                 type: string
 *                 example: "11:00"
 *     responses:
 *       201:
 *         description: Trip created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden (requires admin or operator role)
 */
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "operator"),
  TripController.createTrip
);

/**
 * @swagger
 * /api/trips/{id}:
 *   put:
 *     summary: Update a trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       200:
 *         description: Trip updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Trip not found
 *       403:
 *         description: Forbidden (requires admin or operator role)
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "operator"),
  TripController.updateTrip
);

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete a trip by ID
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trip deleted
 *       404:
 *         description: Trip not found
 *       403:
 *         description: Forbidden (requires admin role)
 */
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  TripController.deleteTrip
);

export default router;
