const CertificationPostService = require('../services/certificationPostService');

//전체 인증글 조회
const getCertificationPosts = async (req, res, next) => {
  try {
    const certificationPostService = new CertificationPostService();
    const findCertificationPosts =
      await certificationPostService.getCertificationPosts();

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
    const { postId } = req.body;
    const certificationPostDetailService = new CertificationPostService();
    const findCertificationPostDetails =
      await certificationPostDetailService.getCertificationPostDetail(postId);

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
    const { user, matchingPost, sublocation, postText, review, deletedAt } =
      req.body;
    const certificationPostService = new CertificationPostService();
    const newCertificationPost = certificationPostService.postCertificationPost(
      user,
      matchingPost,
      sublocation,
      postText,
      review,
      deletedAt,
    );

    res.status(200).json({
      data: newCertificationPost,
      msg: '인증글 생성',
    });
  } catch (err) {
    next(err);
  }
};

// 리뷰 생성
const postCertificationPostReviews = async (req, res, next) => {
  try {
    const { certificationPostId } = req.body;
    const { reviewText, score } = req.body.review;
    const certificationPostService = new CertificationPostService();
    const newReview = certificationPostService.postCertificationPostReview(
      certificationPostId,
      reviewText,
      score,
    );

    res.status(200).json({
      data: newReview,
      msg: '리뷰 생성',
    });
  } catch (err) {
    next(err);
  }
};

// 리뷰 수정
const putCertificationPostReviews = async (req, res, next) => {
  try {
    const { certificationPostId } = req.params;
    const { reviewText, score } = req.body.review;
    const certificationPostService = new CertificationPostService();
    const newReview = certificationPostService.postCertificationPostReview(
      certificationPostId,
      reviewText,
      score,
    );

    res.status(200).json({
      data: newReview,
      msg: '리뷰 생성',
    });
  } catch (err) {
    next(err);
  }
};

// 검색기능
// 지역 선택
const getLocationCertificationPost = async (req, res, next) => {
  try {
    const { location } = req.body;
    const certificationPostService = new CertificationPostService();
    const findLocation =
      certificationPostService.locationCertificationPost(location);

    res.status(200).json({
      data: findLocation,
      msg: '지역별',
    });
  } catch (err) {
    next(err);
  }
};

// 날짜 선택
const getDateCertificationPost = async (req, res, next) => {
  try {
    const { createdAt } = req.body;
    const certificationPostService = new CertificationPostService();
    const findDate = certificationPostService.dateCertificationPost(createdAt);

    res.status(200).json({
      data: findDate,
      msg: '날짜별',
    });
  } catch (err) {
    next(err);
  }
};

// 오래된순
const getOldCertificationPost = async (req, res, next) => {
  try {
    const certificationPostService = new CertificationPostService();
    const findOld = certificationPostService.getCertificationPosts();

    res.status(200).json({
      data: findOld,
      msg: '오래된순',
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getCertificationPosts,
  getCertificationPostDetails,
  postCertificationPosts,
  postCertificationPostReviews,
  putCertificationPostReviews,
  getLocationCertificationPost,
  getDateCertificationPost,
  getOldCertificationPost,
};
