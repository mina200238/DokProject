const CustomError = require('./customError');

class UnauthenticationError extends CustomError {
  constructor(message) {
    super(message, 401);
    this.name = 'UnauthenticationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthenticationError);
    }
  }
}

module.exports = UnauthenticationError;
