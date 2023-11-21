const CustomError = require('./customError');

/**
 * 클라이언트에서 필수 데이터를 누락했을 경우 발생하는 에러
 * 400 Bad Request
 */
class BadRequestError extends CustomError {
  constructor(message) {
    super(message, 400);
    //400이라는 값을 매번 전달해야하는 불편함
    // => customError라는 계층은 없앨 수 있다 (error라는 내장함수를 상속하기 때문)
    //하단 계층에 있는 것들을 바로 error 상속하도록
    this.name = 'BadRequestError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}

module.exports = {
  BadRequestError,
};
