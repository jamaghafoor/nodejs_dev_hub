const { constants } = require("../utils/constatnt");

const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  switch (statusCode) {
    case constants.FORBIDDEN:
      response.json({
        message: error.message,
        success: false,
        status: statusCode,
        stackTrace: error.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      response.json({
        message: error.message,
        success: false,
        status: statusCode,
        stackTrace: error.stack,
      });
      break;
    case constants.NOT_FOUND:
      response.json({
        message: error.message,
        success: false,
        status: statusCode,
        stackTrace: error.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      response.json({
        message: error.message,
        success: false,
        status: statusCode,
        stackTrace: error.stack,
      });
      break;
    case constants.SERVER_ERROR:
      response.json({
        message: error.message,
        success: false,
        status: statusCode,
        stackTrace: error.stack,
      });
      break;

    default:
        console.log("good to go")
      break;
  }
};

module.exports = errorHandler;
