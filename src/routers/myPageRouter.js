const { Router } = require('express');
const {} = require('../controllers/matchingPostController');

const jwtMiddleware = require('../middlewares/jwtMiddleware');

const router = Router();

//내가 쓴 매칭글 가져오기

router.get('/myMatchingPosts', jwtMiddleware.authenticateToken);

// 요청 완료된 매칭 포스트에서 인증글을 작성 안한 목록 가져오기
router.get('/myCertification', jwtMiddleware.authenticateToken);

// 내가 작성한 인증글 목록 가져오기
router.get('/myCertification/:userId', jwtMiddleware.authenticateToken);

module.exports = router;
