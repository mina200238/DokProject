const { Router } = require('express');
const {
  getMatchingPosts,
  getComments,
  postComment,
  updateComment,
  deleteComment,
  getRequestLists,
  postRequest,
  confirmRequest,
} = require('../controllers/matchingPostController');

const router = Router();

//게시글 정렬 관련 기능

router.get('/', getMatchingPosts); //전체 매칭 글 가져오기(default)

//댓글 관련 기능

//라우터 쪼개기 전까지는 /api 이거 건드리지 말기
router.get('/api/:matchingPostId', getComments); // 댓글 가져오기
router.post('/', postComment); //댓글 작성하기
router.put('/:commentId', updateComment); //댓글 수정하기
router.delete('/:commentId', deleteComment); //댓글 삭제하기

//산책 요청 기능

router.get('/:matchingPostId', getRequestLists); // 산책 요청 리스트 가져오기
router.post('/:user/:matchingPostId', postRequest); //산책 요청하기
//산책 요청 확정하기 -> 매칭 status 변경, matchingHaler에 userId 저장
router.put('/:matchingPostId/:commentId', confirmRequest);

module.exports = router;
