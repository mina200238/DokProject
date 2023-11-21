const falsey = require('falsey');
const { BadRequestError } = require('../../errors/badReqestError');
/**
 * client에서 요청한 데이터를 담는 클래스
 */
class UserCreateRequest {
  constructor(userId, password, name, nickname) {
    this.validate(userId, password, name, nickname);

    this.userId = userId;
    this.password = password;
    this.name = name;
    this.nickname = nickname;
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

  validate(userId, password, name, nickname) {
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
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/;
    if (!regex.test(password)) {
      throw new BadRequestError(
        '비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
      );
    }
  }
}

module.exports = UserCreateRequest;
