const MainService = require('../services/mainService');

//매칭 상태 체크 후 , 전체 매칭 글 가져오기  (페이지 네이션)
const getMainContents = async (req, res, next) => {
  try {
    const findMainContents = await MainService.getMainContents();

    res.status(200).json(findMainContents);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMainContents,
};
