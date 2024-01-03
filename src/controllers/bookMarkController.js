const bookMarkService = require('../services/bookMarkService');

// 북마크-매칭중인 매칭신청글 별 요청자수 목록
const getMyMatchingPostInfo = async (req, res, next) => {
  try {
    const userId = req._id;
  } catch (err) {
    next(err);
  }
};

// 북마크-내가 지원한 매칭포스트의 정보

const getMyApplicationList = async (req, res, next) => {
  try {
    const userId = req._id;
    const findMyApplicationList =
      await bookMarkService.getMyApplicationList(userId);
    res.status(200).json(findMyApplicationList);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyMatchingPostInfo,
  getMyApplicationList,
};
