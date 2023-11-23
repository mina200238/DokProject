const MatchingRequest = require('../models/schemas/matchingPost/matchingPost');
const UserDog = require('../models/schemas/userDog/userDog');

class MatchingRequestService {
  // 강아지 정보 불러오기
  async getUserDogInfo(userId) {
    const findUserDog = await UserDog.find({ user: userId });
    return findUserDog;
  }
  // 매칭글 작성하기
  async postMatchingRequest(
    userId,
    userDog,
    price,
    location,
    locationDetail,
    walkingDate,
    walkingDuration,
    text,
    deletedAt,
  ) {
    const newMatchingPost = await MatchingRequest.create({
      user: userId,
      userDog,
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      text,
      deletedAt,
    });

    return newMatchingPost;
  }
}

module.exports = MatchingRequestService;
