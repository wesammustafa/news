const VALIDATION_CODE = 400;
const NOT_FOUND_CODE = 404;
const OK_CODE = 200;
const CREATED_CODE = 201;
const SERVER_ERROR_CODE = 500;

module.exports = (req, res, next) => {
  res.sendSuccess = (data = null, message = 'success') => res.status(OK_CODE).json({
    message,
    data,
  });

  res.sendCreatedSuccess = (data = null, message = 'success') => res.status(CREATED_CODE).json({
    message,
    data,
  });

  res.sendNotfoundError = (message = 'not found') => res.status(NOT_FOUND_CODE).json({
    message,
  });

  res.sendUnknownError = (err = {}, message = 'server error') => res.status(SERVER_ERROR_CODE).json({
    message,
    err,
  });

  res.sendValidationErrors = (errors, message) => res.status(VALIDATION_CODE).json({
    errors,
    message: message || 'error in provided data',
  });

  next();
};
