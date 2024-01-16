const { BadRequestError } = require('../../errors/badReqestError');

//비밀번호 업데이트

class UserUpdatePasswordRequest {
  constructor(body) {
    this.verify(body.password, body.confirmPassword);
    this.password = body.password;
    this.confirmPassword = body.confirmPassword;
  }

  verify(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new BadRequestError('비밀번호가 일치하지 않습니다.');
    }
  }

  getPassword() {
    return this.password;
  }

  getConfirmPassword() {
    return this.confirmPassword;
  }
}

module.exports = UserUpdatePasswordRequest;
