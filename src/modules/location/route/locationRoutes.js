import express from "express";
import * as LocationController from "../controller/locationController.js";
import {
  verifyToken,
  authorizeRoles,
} from "../../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Live GPS tracking endpoints
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get live location data for all buses
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: Returns live GPS data for all buses
 */
router.get("/", LocationController.getAllLocations);

/**
 * @swagger
 * /api/locations/{bus_id}:
 *   get:
 *     summary: Get live location for a specific bus
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: bus_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bus location found
 *       404:
 *         description: Not found
 */
router.get("/:bus_id", LocationController.getBusLocation);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Update bus location (GPS simulation)
 *     tags: [Locations]
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
 *               - latitude
 *               - longitude
 *             properties:
 *               bus_id:
 *                 type: integer
 *                 example: 1
 *               latitude:
 *                 type: number
 *                 example: 7.2906
 *               longitude:
 *                 type: number
 *                 example: 80.6337
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       400:
 *         description: Invalid data
 */
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "operator"),
  LocationController.updateBusLocation
);

/**
 * @swagger
 * /api/locations/history/{bus_id}:
 *   get:
 *     summary: Get location history of a specific bus for a given date
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: bus_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-10-12"
 *     responses:
 *       200:
 *         description: Returns location history (chronological)
 *       400:
 *         description: Missing date query parameter
 *       404:
 *         description: No history found
 */
router.get("/history/:bus_id", LocationController.getBusHistory);

export default router;
