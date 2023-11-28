const { Router } = require('express');
const {
  getCertificationPosts,
  getCertificationPostDetails,
  postCertificationPosts,
  putCertificationPosts,
  postCertificationPostReviews,
  putCertificationPostReviews,
  // 검색
} = require('../controllers/certificationPostController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
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
router.put(
  '/certificationPost',
  jwtMiddleware.authenticateToken,
  putCertificationPosts,
);
// 리뷰 생성
router.put(
  '/newCertificationPostReview/:certificationPostId',
  postCertificationPostReviews,
);
// 리뷰 수정
router.put(
  '/certificationPostReview',
  jwtMiddleware.authenticateToken,
  putCertificationPostReviews,
);

module.exports = router;
