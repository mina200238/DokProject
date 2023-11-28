const { Router } = require('express');
const { matchingRequest } = require('../controllers/matchingRequestController');

const router = Router();

// 강아지 정보 받아오기
// router.get('/doginformation/:userId', getDogInfo);

// 매칭 신청하기
router.post('/matchingRequest/:userId', matchingRequest);

module.exports = router;
