import Joi from "joi";

export const tripSchema = Joi.object({
  bus_id: Joi.number().integer().required(),
  route_id: Joi.number().integer().required(),
  trip_date: Joi.date().iso().required(),
  departure_time: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  arrival_time: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
});
