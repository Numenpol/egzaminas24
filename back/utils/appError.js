class AppError extends Error {
    constructor(message, statusCode) {
      // message is build in error parameter
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;