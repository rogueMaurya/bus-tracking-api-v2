import Joi from "joi";

export const busSchema = Joi.object({
  bus_number: Joi.string().min(3).max(50).required(),
  route_id: Joi.number().integer().required(),
  operator_name: Joi.string().min(2).max(100).required(),
  status: Joi.string().valid("active", "inactive").optional(),
});
