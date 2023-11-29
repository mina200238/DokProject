const MyPageService = require('../services/myPageService');

//내가 쓴 매칭글 가져오기
const getMyMatchingPost = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const findMyMatchingPosts = await MyPageService.getMyMatchingPost(userId);

    res.status(200).json(findMyMatchingPosts);
  } catch (err) {
    next(err);
  }
};

// 내가 작성한 매칭 완료된 매칭 포스트 중에서, 인증글을 작성하지 않은 목록 가져오기
const getUncertificatiedList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const findUncertificatiedList =
      await MyPageService.getUncertificatiedList(userId);

    res.status(200).json(findUncertificatiedList);
  } catch (err) {
    next(err);
  }
};

// 내 인증글 목록 가져오기
const getCertificationList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const findCertificationList =
      await MyPageService.getCertificationList(userId);

    res.status(200).json(findCertificationList);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyMatchingPost,
  getUncertificatiedList,
  getCertificationList,
};
