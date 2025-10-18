import * as BusModel from "../model/bus.js";

const createError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

export const listBuses = async () => {
  return await BusModel.getAllBuses();
};

export const getBus = async (id) => {
  const bus = await BusModel.getBusById(id);
  if (!bus) throw createError("Bus not found", 404);
  return bus;
};

export const addBus = async (data) => {
  return await BusModel.createBus(data);
};

export const editBus = async (id, data) => {
  await getBus(id);
  return await BusModel.updateBus(id, data);
};

export const removeBus = async (id) => {
  await getBus(id);
  await BusModel.deleteBus(id);
};
