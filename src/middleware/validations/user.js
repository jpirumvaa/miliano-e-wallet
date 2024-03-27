import Joi from "joi";

export const userValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
      "string.base": "Name must be a valid string",
    }),
    email: Joi.string().email().messages({
      "string.empty": "Email can't be empty",
      "string.email": "Invalid email",
      "string.base": "Email must be a string",
    }),
    phoneNumber: Joi.string().messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Please fill in the phone number",
    }),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/)
      .messages({
        "string.base": "Password must be string",
        "string.empty": "Please fill in your Password",
        "string.min": "Password must be atleast {#limit} characters long",
        "any.required": "Password is required",
        "string.pattern.base":
          "Password must be at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    profilePhoto: Joi.string().uri().allow(null).messages({
      "string.uri": "Profile photo must be a link",
    }),
    nid: Joi.string().messages({
      "string.base": "National ID must be a string",
      "string.empty": "Please fill in the National Id",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
