const { Router } = require('express');
const {
  getCertificationPosts,
  getCertificationPostDetails,
  postCertificationPosts,
  putCertificationPosts,
  postCertificationPostReviews,
  putCertificationPostReviews,
  // 검색
  getLocationCertificationPost,
  getDateCertificationPost,
  getOldCertificationPost,
} = require('../controllers/certificationPostController');

const router = Router();

// 인증글 생성
router.post(
  '/newCertificationPost/:userId/:matchingPost',
  postCertificationPosts,
);
// 전체 인증글 조회
router.get('/allCertificationPost', getCertificationPosts);
// 상세 인증글 조회
router.get('/certificationPostDetails/:postId', getCertificationPostDetails);
// 인증글 수정
router.put('/certificationPost', putCertificationPosts);
// 리뷰 생성
router.put(
  '/newCertificationPostReview/:certificationPostId',
  postCertificationPostReviews,
);
// 리뷰 수정
router.put('/certificationPostReview', putCertificationPostReviews);

// 검색
// 위치
router.get('/locationCertificationPost', getLocationCertificationPost);
// 날짜
router.get('/dateCertificationPost', getDateCertificationPost);
// 오래된순
router.get('/oldCertificationPost', getOldCertificationPost);

module.exports = router;
