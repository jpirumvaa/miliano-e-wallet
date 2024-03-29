import Joi from "joi";

export const walletValidation = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().required().messages({
      "any.required": "User ID is required",
      "number.base": "User ID must be a number",
    }),
    accountName: Joi.string().required().messages({
      "any.required": "Account name is required",
      "string.base": "Account name must be a string",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
export const updateWalletValidation = (req, res, next) => {
  const schema = Joi.object({
    accountName: Joi.string().required().messages({
      "any.required": "Account name is required",
      "string.base": "Account name must be a string",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
