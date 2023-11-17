const CertificationPostService = require('../services/certificationPostService');

//전체 인증글 조회
const getCertificationPosts = async (req, re, next) => {
  try {
    const certificationPostService = new CertificationPostService();
    const findCertificationPosts =
      await certificationPostService().getCertificationPost;

    res.status(200).json({
      data: findCertificationPosts,
      msg: '전체 인증글 조회',
    });
  } catch (err) {
    next(err);
  }
};

// 상세 인증글 조회
const getCertificationPostDetails = async (req, res, next) => {
  try {
    const certificationPostDetailService = new CertificationPostService();
    const findCertificationPostDetails =
      await certificationPostDetailService.postCertificationPost;

    res.status(200).json({
      data: findCertificationPostDetails,
      msg: '상세 인증글 조회',
    });
  } catch (err) {
    next(err);
  }
};

// 인증글 생성
const postCertificationPosts = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCertificationPosts,
  getCertificationPostDetails,
  postCertificationPosts,
};
