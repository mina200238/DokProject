class UnauthenticationError extends Error {
  statusCode = 401;
  constructor(message) {
    super(message);
    this.name = 'UnauthenticationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthenticationError);
    }
  }
  getMessage() {
    return {
      error: this.name,
      message: this.message,
    };
  }

  getStatusCode() {
    return this.statusCode;
  }
}

module.exports = UnauthenticationError;
