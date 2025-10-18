import * as TripModel from "../model/trip.js";

const createError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

export const listTrips = async () => {
  return await TripModel.getAllTrips();
};

export const getTrip = async (id) => {
  const trip = await TripModel.getTripById(id);
  if (!trip) throw createError("Trip not found", 404);
  return trip;
};

export const addTrip = async (data) => {
  return await TripModel.createTrip(data);
};

export const editTrip = async (id, data) => {
  await getTrip(id);
  return await TripModel.updateTrip(id, data);
};

export const removeTrip = async (id) => {
  await getTrip(id);
  await TripModel.deleteTrip(id);
};
