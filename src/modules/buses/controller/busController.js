import * as BusService from "../service/busService.js";
import { busSchema } from "../validation/busValidation.js";

export const getAllBuses = async (req, res, next) => {
  try {
    const buses = await BusService.listBuses();
    res.json(buses);
  } catch (err) {
    next(err);
  }
};

export const getBusById = async (req, res, next) => {
  try {
    const bus = await BusService.getBus(req.params.id);
    res.json(bus);
  } catch (err) {
    next(err);
  }
};

export const createBus = async (req, res, next) => {
  try {
    const { error } = busSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const newBus = await BusService.addBus(req.body);
    res.status(201).json(newBus);
  } catch (err) {
    next(err);
  }
};

export const updateBus = async (req, res, next) => {
  try {
    const { error } = busSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const updated = await BusService.editBus(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteBus = async (req, res, next) => {
  try {
    await BusService.removeBus(req.params.id);
    res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    next(err);
  }
};
