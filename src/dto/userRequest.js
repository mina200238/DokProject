class UserRequest {
  constructor(userId, password, name, nickname) {
    if (
      userId === (null || undefined) ||
      password === (null || undefined) ||
      name === (null || undefined) ||
      nickname === (null || undefined)
    ) {
      throw new Error("Invalid UserRequest");
    }
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
}

module.exports = UserRequest;
