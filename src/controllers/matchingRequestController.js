const MatchingRequestService = require('../services/matchingRequestService');

// 강아지 정보 불러오기
const getDogInfo = async (req, res, next) => {
  const _id = req._id;
  const DogInfo = await MatchingRequestService.getUserDogInfo(_id);
  res.status(200).json(DogInfo);
};
// 매칭글 신청하기
const matchingRequest = async (req, res, next) => {
  try {
    const _id = req._id;
    const {
      userDog,
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      requestText,
    } = req.body;
    const newMatchingRequest = await MatchingRequestService.postMatchingRequest(
      _id,
      userDog,
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

// 매칭글 수정하기
const updateMatchingRequest = async (req, res, next) => {
  try {
    const _id = req._id;
    const {
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      requestText,
    } = req.body;
    const updatedMatchingRequest =
      await MatchingRequestService.postMatchingRequest(
        _id,
        price,
        location,
        locationDetail,
        walkingDate,
        walkingDuration,
        requestText,
      );

    res.status(200).json(updatedMatchingRequest);
  } catch (err) {
    next(err);
  }
};

// 매칭글 삭제하기
// 사실은 put. deletedAt에 Date를 찍어준다.
const removeMatchingRequest = async (req, res, next) => {
  try {
    const _id = req._id;
    const removeMatchingRequest =
      await MatchingRequestService.deleteMatchingRequest(_id);

    res.status(200).json(removeMatchingRequest);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDogInfo,
  matchingRequest,
  updateMatchingRequest,
  removeMatchingRequest,
};

// 합친것
// 매칭글 신청하기
// const matchingRequest = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const {
//       price,
//       location,
//       locationDetail,
//       walkingDate,
//       walkingDuration,
//       requestText,
//     } = req.body;
//     const newMatchingRequest = await MatchingRequestService.postMatchingRequest(
//       userId,
//       price,
//       location,
//       locationDetail,
//       walkingDate,
//       walkingDuration,
//       requestText,
//     );

//     res.status(200).json(newMatchingRequest);
//   } catch (err) {
//     next(err);
//   }
// };

// 분리한 것
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

//
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
