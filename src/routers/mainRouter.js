const { Router } = require('express');
const { getMainContents } = require('../controllers/mainController');

const router = Router();

//게시글 정렬 관련 기능

//매칭 메인
router.get('/', getMainContents); //메인 전체 contents가져오기

module.exports = router;
