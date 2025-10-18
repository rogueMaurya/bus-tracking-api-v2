import Joi from "joi";

export const routeSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  start_location: Joi.string().min(2).max(100).required(),
  end_location: Joi.string().min(2).max(100).required(),
  distance_km: Joi.number().positive().precision(2).required(),
  estimated_time: Joi.string().min(1).max(50).required(),
});
