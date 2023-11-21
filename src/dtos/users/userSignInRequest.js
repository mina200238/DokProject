const falsey = require('falsey');
const { BadRequestError } = require('../../errors/badReqestError');

class UserSignInRequest {
  constructor(userId, password) {
    this.validate(userId, password);

    this.userId = userId;
    this.password = password;
  }

  getUserId() {
    return this.userId;
  }

  getPassword() {
    return this.password;
  }

  validate(userId, password) {
    if (falsey(userId) || falsey(password)) {
      throw new BadRequestError(
        `필수 데이터가 없습니다. userId: ${userId}, password: ${password}`,
      );
    }
  }
}

module.exports = UserSignInRequest;
