const { BadRequestError } = require('../../errors/badReqestError');

//소개글 업데이트

class UserUpdateUserIntroduceRequest {
  constructor(body) {
    this.verify(body.introduce);

    this.introduce = body.introduce;
  }

  verify(introduce) {
    if (!introduce) {
      throw new BadRequestError('소개글을 입력해주세요.');
    }
  }

  getIntroduce() {
    return this.introduce;
  }
}

module.exports = UserUpdateUserIntroduceRequest;
