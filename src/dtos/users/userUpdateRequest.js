const { BadRequestError } = require('../../errors/badReqestError');

class UserUpdateRequest {
  constructor(body) {
    const address = {
      text: body.address.text,
      code: body.address.code,
    };

    this.verify(
      body.password,
      body.confirmPassword,
      body.name,
      address,
      body.phoneNumber,
      body.nickname,
    );
    this.password = body.password;
    this.confirmPassword = body.confirmPassword;
    this.name = body.name;
    this.address = address;
    this.phoneNumber = body.phoneNumber;
    this.nickname = body.nickname;
    this.userImg = body.userImg;
  }

  verify(password, confirmPassword, name, address, phoneNumber, nickname) {
    if (password !== confirmPassword) {
      throw new BadRequestError('비밀번호가 일치하지 않습니다.');
    }

    if (!name) {
      throw new BadRequestError('이름을 입력해주세요.');
    }

    if (!address || !address.text) {
      throw new BadRequestError('주소를 입력해주세요.');
    }

    if (!phoneNumber) {
      throw new BadRequestError('휴대폰 번호를 입력해주세요.');
    }

    const PhoneNumberRegex = /^\d{4} \d{4}$/;
    if (!PhoneNumberRegex.test(phoneNumber)) {
      throw new BadRequestError(
        `핸드폰 번호 형식이 유효하지 않습니다. phoneNumber: ${phoneNumber}`,
      );
    }

    if (!nickname) {
      throw new BadRequestError('닉네임을 입력해주세요.');
    }
  }

  getPassword() {
    return this.password;
  }

  getConfirmPassword() {
    return this.confirmPassword;
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getNickname() {
    return this.nickname;
  }

  getUserImg() {
    return this.userImg;
  }
}

module.exports = UserUpdateRequest;
