const { Router } = require('express');
const {
  getDogInfo,
  matchingRequest,
  updateMatchingRequest,
  removeMatchingRequest,
} = require('../controllers/matchingRequestController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
// const { removeMatchingRequest } = require('../services/matchingRequestService');

const router = Router();

// 강아지 정보 받아오기
router.get('/doginformation/:userId', getDogInfo);

// 매칭 신청하기
router.post('/matchingRequest/:userId', matchingRequest);
// 매칭글 수정하기
router.put(
  '/newMatchingRequest',
  jwtMiddleware.authenticateToken,
  updateMatchingRequest,
);
// 매칭글 삭제하기
router.put(
  '/noMatchingRequest/:userId',
  jwtMiddleware.authenticateToken,
  removeMatchingRequest,
);

module.exports = router;
