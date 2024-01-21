const { Router } = require('express');
const {
  getMyMatchingPostInfo,
  getMyApplicationList,
} = require('../controllers/bookMarkController');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const router = Router();

//북마크 관련 기능
//매칭중인 매칭신청글 별 요청자수 목록
router.get(
  '/myMatchingPostInfo',
  jwtMiddleware.authenticateToken,
  getMyMatchingPostInfo,
);

// 내가 지원한 매칭포스트의 정보
router.get(
  '/myApplicationList',
  jwtMiddleware.authenticateToken,
  getMyApplicationList,
);

module.exports = router;
