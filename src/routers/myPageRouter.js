const { Router } = require('express');
const {
  getMyMatchingPost,
  getUncertificatiedList,
  getCertificationList,
} = require('../controllers/myPageController');

const jwtMiddleware = require('../middlewares/jwtMiddleware');

const router = Router();

//내가 쓴 매칭글 가져오기

router.get(
  '/myMatchingPosts',
  jwtMiddleware.authenticateToken,
  getMyMatchingPost,
);

// 매칭 완료된 매칭 포스트 중에서, 인증글을 작성하지 않은 목록 가져오기
router.get(
  '/myCertification/:userId',
  // jwtMiddleware.authenticateToken,
  getUncertificatiedList,
);

// 내가 작성한 인증글 목록 가져오기
router.get(
  '/myCertificationLists',
  jwtMiddleware.authenticateToken,
  getCertificationList,
);

module.exports = router;
