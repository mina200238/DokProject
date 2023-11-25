const { Router } = require('express');
const {
  getCertificationPosts,
  getCertificationPostDetails,
  postCertificationPosts,
  postCertificationPostReviews,
  putCertificationPostReviews,
  // 검색
  getLocationCertificationPost,
  getDateCertificationPost,
  getOldCertificationPost,
} = require('../controllers/certificationPostController');

const router = Router();

// 인증글 생성
router.post('/postCertificationPost', postCertificationPosts);
// 전체 인증글 조회
router.get('/getCertificationPost', getCertificationPosts);
// 상세 인증글 조회
router.get('/getCertificationPostDetails/:userId', getCertificationPostDetails);
// 리뷰 생성
router.post('/postCertificationPostReview', postCertificationPostReviews);
// 리뷰 수정
router.put('/putCertificationPost', putCertificationPostReviews);

// 검색
// 위치
router.get('/getLocationCertificationPost', getLocationCertificationPost);
// 날짜
router.get('/getDateCertificationPost', getDateCertificationPost);
// 오래된순
router.get('/getOldCertificationPost', getOldCertificationPost);

module.exports = router;
