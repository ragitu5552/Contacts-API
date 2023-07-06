import { STATUS_CODES } from "../constants";

// This is a custom error handler middleware
// It will be used in the routes that need it

export const errorHandler = (err, req, res, next) => {
    // If the error is a validation error, send a 400 response
    // Otherwise, send a 500 response
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
          res.json({
            title: "Validation Failed",
            message: err.message,
            stackTrace: err.stack,
          });
          break;
        case constants.NOT_FOUND:
          res.json({
            title: "Not Found",
            message: err.message,
            stackTrace: err.stack,
          });
        case constants.UNAUTHORIZED:
          res.json({
            title: "Unauthorized",
            message: err.message,
            stackTrace: err.stack,
          });
        case constants.FORBIDDEN:
          res.json({
            title: "Forbidden",
            message: err.message,
            stackTrace: err.stack,
          });
        case constants.SERVER_ERROR:
          res.json({
            title: "Server Error",
            message: err.message,
            stackTrace: err.stack,
          });
        default:
          console.log("No Error, All good !");
          break;
      }  
}