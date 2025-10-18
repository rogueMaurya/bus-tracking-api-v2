import * as RouteModel from "../model/route.js";

export const listRoutes = async () => {
  return await RouteModel.getAllRoutes();
};

export const getRoute = async (id) => {
  const route = await RouteModel.getRouteById(id);
  if (!route) {
    throw new Error("Route not found");
  }
  return route;
};

export const addRoute = async (routeData) => {
  return await RouteModel.createRoute(routeData);
};

export const editRoute = async (id, routeData) => {
  await getRoute(id);
  return await RouteModel.updateRoute(id, routeData);
};

export const removeRoute = async (id) => {
  await getRoute(id);
  await RouteModel.deleteRoute(id);
};
