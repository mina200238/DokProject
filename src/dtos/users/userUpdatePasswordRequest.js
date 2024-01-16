const { BadRequestError } = require('../../errors/badReqestError');

//비밀번호 업데이트

class UserUpdatePasswordRequest {
  constructor(body) {
    this.verify(
      body.currentPassword,
      body.newPassword,
      body.confirmNewPassword,
    );
    //현재 비밀번호
    this.currentPassword = body.currentPassword;
    //변경할 새 비밀번호
    this.newPassword = body.newPassword;
    //새 비밀번호 확인
    this.confirmNewPassword = body.confirmNewPassword;
  }

  verify(currentPassword, newPassword, confirmNewPassword) {
    if (!currentPassword) {
      throw new BadRequestError('현재 비밀번호를 작성해주세요.');
    }
    if (!newPassword) {
      throw new BadRequestError('변경할 비밀번호를 작성해주세요.');
    }
    if (!confirmNewPassword) {
      throw new BadRequestError('변경할 비밀번호를 작성해주세요.');
    }

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestError('새 비밀번호 확인란을 정확히 작성해주세요.');
    }
  }

  getCurrentPassword() {
    return this.currentPassword;
  }

  getNewPassword() {
    return this.newPassword;
  }

  getconfirmNewPassword() {
    return this.confirmNewPassword;
  }
}

module.exports = UserUpdatePasswordRequest;
