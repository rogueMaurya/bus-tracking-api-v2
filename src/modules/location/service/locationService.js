import * as LocationModel from "../model/location.js";

export const updateBusLocation = async (bus_id, latitude, longitude) => {
  await LocationModel.updateLocation(bus_id, latitude, longitude);
  await LocationModel.addToHistory(bus_id, latitude, longitude);
  return {
    bus_id,
    latitude,
    longitude,
    message: "Location updated successfully",
  };
};

export const getBusLiveLocation = async (bus_id) => {
  const data = await LocationModel.getBusLocation(bus_id);
  if (!data) throw new Error("Bus location not found");
  return data;
};

export const getAllLiveLocations = async () => {
  return await LocationModel.getAllLiveLocations();
};

export const getBusHistory = async (bus_id, date) => {
  const data = await LocationModel.getBusHistory(bus_id, date);
  if (data.length === 0) throw new Error("No history found for this date");
  return data;
};
