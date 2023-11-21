/**
 * 최상위 에러 클래스로
 * 앞으로 생성되는 모든 에러 클래스는 이 클래스를 상속해야함.
 */
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
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

module.exports = CustomError;
