class MyInfoResponse {
  constructor(user, userDogs) {
    this.userId = user.userId;
    this.name = user.name;
    this.nickname = user.nickname;
    this.phoneNumber = user.phoneNumber;
    this.address = user.address;
    this.userImg = user.userImg;
    this.introduce = user.introduce;
    this.isCertificated = user.isCertificated;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.userDogs = userDogs;
  }
}

module.exports = MyInfoResponse;
