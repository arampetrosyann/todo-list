const mongoose = require("mongoose");
const flexibleError = require("../public/javascripts/helpers/flexibleError.helper");

exports.wrapper = (func) => async (req, res, next) => {
  try {
    await func(req, res);
  } catch (error) {
    next(error);
  }
};

exports.errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  if (err instanceof flexibleError) {
    code = err.code;

    message = err.message;
  } else if (err instanceof mongoose.Error) {
    switch (err.name) {
      case "ValidationError":
        code = 400;

        message = err.message;

        break;
      case "CastError":
        code = 404;

        message = "Not Found. Wrong id!";

        break;
      case "DocumentNotFoundError":
        code = 404;

        message = "Underlying document was not found.";

        break;
    }
  }

  res.status(code).json({ success: false, error: message });
};
