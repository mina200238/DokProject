const MatchingRequestService = require('../services/matchingRequestService');

// real
const matchingRequest = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const {
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      requestText,
    } = req.body;
    const newMatchingRequest = await MatchingRequestService.postMatchingRequest(
      userId,
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      requestText,
    );

    res.status(200).json(newMatchingRequest);
  } catch (err) {
    next(err);
  }
};

// // 강아지 정보 받아오기
// const getDogInfo = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const getUserDog = await MatchingRequestService.getUserDogInfo(userId);

//     res.status(200).json(getUserDog);
//   } catch (err) {
//     next(err);
//   }
// };

// // 매칭글 신청하기
// const postMatchingRequest = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const {
//       userDog,
//       price,
//       location,
//       locationDetail,
//       walkingDate,
//       walkingDuration,
//       requestText,
//       deletedAt,
//     } = req.body;

//     const newMatchingRequest = await MatchingRequestService.postMatchingRequest(
//       userId,
//       userDog,
//       price,
//       location,
//       locationDetail,
//       walkingDate,
//       walkingDuration,
//       requestText,
//       deletedAt,
//     );

//     res.status(200).json(newMatchingRequest);
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = { matchingRequest };
