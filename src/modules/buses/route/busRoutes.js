import express from "express";
import * as BusController from "../controller/busController.js";
import {
  verifyToken,
  authorizeRoles,
} from "../../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: API endpoints for managing buses
 */

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: List of all buses
 */
router.get("/", BusController.getAllBuses);

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get bus by ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bus found
 *       404:
 *         description: Bus not found
 */
router.get("/:id", BusController.getBusById);

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bus_number
 *               - route_id
 *               - operator_name
 *             properties:
 *               bus_number:
 *                 type: string
 *                 example: NB-1234
 *               route_id:
 *                 type: integer
 *                 example: 1
 *               operator_name:
 *                 type: string
 *                 example: SuperLine
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Bus created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden (requires admin role)
 */
router.post("/", verifyToken, authorizeRoles("admin"), BusController.createBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update a bus
 *     tags: [Buses]
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
 *             type: object
 *             properties:
 *               bus_number:
 *                 type: string
 *               route_id:
 *                 type: integer
 *               operator_name:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Bus updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Bus not found
 *       403:
 *         description: Forbidden (requires admin or operator role)
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "operator"),
  BusController.updateBus
);

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete a bus by ID
 *     tags: [Buses]
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
 *         description: Bus deleted
 *       404:
 *         description: Bus not found
 *       403:
 *         description: Forbidden (requires admin role)
 */
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  BusController.deleteBus
);

export default router;
