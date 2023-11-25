const falsey = require('falsey');
const { BadRequestError } = require('../../errors/badReqestError');
/**
 * client에서 요청한 데이터를 담는 클래스
 */
class UserCreateRequest {
  constructor(
    userId,
    password,
    name,
    nickname,
    phoneNumber,
    address,
    introduce,
    isCertificated,
  ) {
    this.validate(userId, password, name, nickname, phoneNumber);

    this.userId = userId;
    this.password = password;
    this.name = name;
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.introduce = introduce;
    this.isCertificated = isCertificated;
  }

  getUserId() {
    //외부에서 인스턴스의 userId를 접근 할 수 있도록 getter를 만들어준다.
    return this.userId;
  }

  getPassword() {
    return this.password;
  }

  getName() {
    return this.name;
  }

  getNickname() {
    return this.nickname;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getAddress() {
    return this.address;
  }

  getIntroduce() {
    return this.introduce;
  }

  getIsCertificated() {
    return this.isCertificated;
  }

  validate(userId, password, name, nickname, phoneNumber) {
    if (
      falsey(userId) ||
      falsey(password) ||
      falsey(name) ||
      falsey(nickname)
    ) {
      throw new BadRequestError(
        `필수 데이터가 없습니다. userId: ${userId}, password: ${password}, name: ${name}, nickname: ${nickname}`,
      );
    }

    if (password.length < 8) {
      throw new BadRequestError('비밀번호는 8자리 이상이어야 합니다.');
    }
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/;
    if (!PasswordRegex.test(password)) {
      throw new BadRequestError(
        '비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
      );
    }
    if (falsey(phoneNumber)) {
    } else {
      const PhoneNumberRegex = /^\d{4} \d{4}$/;
      if (!PhoneNumberRegex.test(phoneNumber)) {
        throw new BadRequestError(
          `핸드폰 번호 형식이 유효하지 않습니다. phoneNumber: ${phoneNumber}`,
        );
      }
    }
  }
}

module.exports = UserCreateRequest;
