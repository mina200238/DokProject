const MatchingRequestService = require('../services/matchingRequestService');

const postMatchingRequest = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const {
      userDog,
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      text,
      deletedAt,
    } = req.body;
    const matchingRequestService = new MatchingRequestService();
    const getUserDog = matchingRequestService.getUserDogInfo(userId);
    const newMatchingRequest = matchingRequestService.postMatchingRequest(
      userId,
      userDog,
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      text,
      deletedAt,
    );

    res.status(200).json({
      data: { getUserDog, newMatchingRequest },
      msg: '매칭글 생성',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = postMatchingRequest;
