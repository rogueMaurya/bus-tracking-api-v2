import * as TripService from "../service/tripService.js";
import { tripSchema } from "../validation/tripValidation.js";

export const getAllTrips = async (req, res, next) => {
  try {
    const trips = await TripService.listTrips();
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

export const getTripById = async (req, res, next) => {
  try {
    const trip = await TripService.getTrip(req.params.id);
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

export const createTrip = async (req, res, next) => {
  try {
    const { error } = tripSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }
    const newTrip = await TripService.addTrip(req.body);
    res.status(201).json(newTrip);
  } catch (err) {
    next(err);
  }
};

export const updateTrip = async (req, res, next) => {
  try {
    const { error } = tripSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }
    const updated = await TripService.editTrip(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    await TripService.removeTrip(req.params.id);
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    next(err);
  }
};
