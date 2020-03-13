const Joi = require('@hapi/joi');
const ValidatorV1 = require('./v1.0/validator');

const validations = {
  v1: new ValidatorV1(Joi, async (schema, data) => schema.validateAsync(data, {
    abortEarly: false,
  })),
};

module.exports = (layer) => (action) => async (req, res, next) => {
  if (!action) {
    return next();
  }

  const validateFunc = validations[layer][action];
  try {
    await validateFunc.call(validations[layer], req.body, { abortEarly: false });
    return next();
  } catch (err) {
    const errors = {};
    err.details.forEach((e) => {
      errors[e.path[0]] = [e.message];
    });
    return res.sendValidationErrors(errors);
  }
};
