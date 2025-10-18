import * as RouteService from "../service/routeService.js";
import { routeSchema } from "../validation/routeValidation.js";

export const getAllRoutes = async (req, res, next) => {
  try {
    const routes = await RouteService.listRoutes();
    res.json(routes);
  } catch (err) {
    next(err);
  }
};

export const getRouteById = async (req, res, next) => {
  try {
    const route = await RouteService.getRoute(req.params.id);
    res.json(route);
  } catch (err) {
    next(err);
  }
};

export const createRoute = async (req, res, next) => {
  try {
    const { error } = routeSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const newRoute = await RouteService.addRoute(req.body);
    res.status(201).json(newRoute);
  } catch (err) {
    next(err);
  }
};

export const updateRoute = async (req, res, next) => {
  try {
    const { error } = routeSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const updated = await RouteService.editRoute(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteRoute = async (req, res, next) => {
  try {
    await RouteService.removeRoute(req.params.id);
    res.json({ message: "Route deleted successfully" });
  } catch (err) {
    next(err);
  }
};
