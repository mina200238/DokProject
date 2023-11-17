const { Router } = require('express');
const {
  getCertificationPosts,
  // getCertificationPostDetail,
} = require('../controllers/certificationPostController');

const router = Router();

// 인증글 생성
router.post('/api/certificationPostList', getCertificationPosts);
// 전체 인증글 조회
router.get('/api/certificationPostList', getCertificationPosts);
// 상세 인증글 조회
// router.get('/api/certificationPostList', getCertificationPostDetail);

module.exports = router;
