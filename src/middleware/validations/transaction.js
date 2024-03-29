import Joi from "joi";

export const transactValidation = (req, res, next) => {
  const schema = Joi.object({
    originWalletId: Joi.number().required().messages({
      "any.required": "Origin wallet is required",
      "number.base": "Origin wallet must be a number",
    }),
    destinationWalletId: Joi.number().required().messages({
      "any.required": "Destination wallet is required",
      "number.base": "Destination wallet must be a number",
    }),
    amount: Joi.number().required().messages({
      "any.required": "Amount is required",
      "number.base": "Amount must be a number",
    }),
    description: Joi.string().required().messages({
      "string.required": "Description is required",
      "string.base": "Description must be a string",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
// export const updateWalletValidation = (req, res, next) => {
//   const schema = Joi.object({
//     accountName: Joi.string().required().messages({
//       "any.required": "Account name is required",
//       "string.base": "Account name must be a string",
//     }),
//   });
//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).send({ error: error.details[0].message });
//   return next();
// };
