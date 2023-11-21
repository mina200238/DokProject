const CustomError = require('./customError');

class NotFoundError extends CustomError {
  //statusCode = 404; => customError 는 필요없어짐 (매번 404를 전달해주지 않아도 괜찮아짐!)
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}

module.exports = NotFoundError;
