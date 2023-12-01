//const { BadRequestError } = require('../../errors/badReqestError');
class UserDogCreateRequest {
  constructor(
    user,
    dogName,
    dogImg,
    birth,
    dogType,
    gender,
    personality,
    note,
  ) {
    //this.validate(user, dogName, dogImg, birth, dogType, gender, personality);
    this.user = user;
    this.dogName = dogName;
    this.dogImg = dogImg;
    this.birth = birth;
    this.dogType = dogType;
    this.gender = gender;
    this.note = note;
    this.personality = personality;
  }
  getUserId() {
    return this.user;
  }

  getDogName() {
    return this.dogName;
  }

  getDogImg() {
    return this.dogImg;
  }

  getBirth() {
    return this.birth;
  }

  getDogType() {
    return this.dogType;
  }

  getGender() {
    return this.gender;
  }

  getPersonality() {
    return this.personality;
  }
  getNote() {
    return this.note;
  }
}

module.exports = UserDogCreateRequest;
