const MatchingRequest = require('../models/matchingPost/matchingPost');
const UserDog = require('../models/user/userDog');

class MatchingRequestService {
  // 강아지 정보 불러오기
  // async getUserDogInfo(userId) {
  //   const findUserDog = await UserDog.find({ user: userId });
  //   return findUserDog;
  // }

  // 매칭글 작성하기
  async postMatchingRequest(
    userId,
    price,
    location,
    locationDetail,
    walkingDate,
    walkingDuration,
    requestText,
    // dto 사용하기.
  ) {
    const findUserDog = await UserDog.find({ user: userId });
    const newMatchingPost = await MatchingRequest.create({
      user: userId,
      userDog: findUserDog[0]._id,
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      requestText,
    });

    return newMatchingPost;
  }
}

module.exports = new MatchingRequestService();
