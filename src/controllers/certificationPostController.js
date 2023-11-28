const CertificationPostService = require('../services/certificationPostService');

//전체 인증글 조회
const getCertificationPosts = async (req, res, next) => {
  try {
    const { matchingPost } = req.body;
    const { page = 1, perPage = 3 } = req.query;
    const findCertificationPosts =
      await CertificationPostService.getCertificationPosts(
        matchingPost,
        page,
        perPage,
      );

    res.status(200).json(findCertificationPosts);
  } catch (err) {
    next(err);
  }
};

// 상세 인증글 조회
const getCertificationPostDetails = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const findCertificationPostDetails =
      await CertificationPostService.getCertificationPostDetail(postId);

    res.status(200).json(findCertificationPostDetails);
  } catch (err) {
    next(err);
  }
};

// 인증글 생성
const postCertificationPosts = async (req, res, next) => {
  try {
    const { userId, matchingPost } = req.params;
    const { certificationImg, sublocation, postText, review } = req.body;
    const newCertificationPost =
      await CertificationPostService.postCertificationPost(
        userId,
        matchingPost,
        certificationImg,
        sublocation,
        postText,
        review,
      );

    console.log(newCertificationPost);
    res.status(200).json(newCertificationPost);
  } catch (err) {
    next(err);
  }
};

// 인증글 수정
const putCertificationPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const Data = req.body;
    const newPost = await CertificationPostService.updateCertificationPost(
      userId,
      Data,
    );

    res.status(200).json(newPost);
  } catch (err) {
    next(err);
  }
};

// 리뷰 생성
const postCertificationPostReviews = async (req, res, next) => {
  try {
    const { certificationPostId } = req.params;
    const { review } = req.body;
    const newReview =
      await CertificationPostService.postCertificationPostReview(
        certificationPostId,
        review,
      );
    res.status(200).json(newReview);
  } catch (err) {
    next(err);
  }
};

// 리뷰 수정
const putCertificationPostReviews = async (req, res, next) => {
  try {
    const { certificationPostId } = req.params;
    const { review } = req.body;
    const newReview =
      await CertificationPostService.postCertificationPostReview(
        certificationPostId,
        review,
      );

    res.status(200).json(newReview);
  } catch (err) {
    next(err);
  }
};

// 검색기능
// 지역 선택
const getLocationCertificationPost = async (req, res, next) => {
  try {
    const { location } = req.body;
    const findLocation =
      await CertificationPostService.locationCertificationPost(location);

    res.status(200).json(findLocation);
  } catch (err) {
    next(err);
  }
};

// 날짜 선택
const getDateCertificationPost = async (req, res, next) => {
  try {
    const { createdAt } = req.body;
    const findDate =
      await CertificationPostService.dateCertificationPost(createdAt);

    res.status(200).json(findDate);
  } catch (err) {
    next(err);
  }
};

// 오래된순
const getOldCertificationPost = async (req, res, next) => {
  try {
    const findOld = await CertificationPostService.getCertificationPosts();

    res.status(200).json(findOld);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getCertificationPosts,
  getCertificationPostDetails,
  postCertificationPosts,
  putCertificationPosts,
  postCertificationPostReviews,
  putCertificationPostReviews,
  getLocationCertificationPost,
  getDateCertificationPost,
  getOldCertificationPost,
};
