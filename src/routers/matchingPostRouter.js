const { Router } = require('express');
const {
  getMatchingPosts,
  getComments,
  postComment,
  getRequestLists,
  sendRequest,
} = require('../controllers/matchingPostController');

const router = Router();

//게시글 정렬 관련 기능

router.get('/', getMatchingPosts); //전체 매칭 글 가져오기(default)

//댓글 관련 기능
router.get('/', getComments); // 댓글 가져오기
router.post('/matchingPostDetail', postComment); //댓글 작성하기

//산책 요청 기능
// router.get('/matchingPostDetail/:matchingPost_id', getRequestLists); // 산책 요청 리스트 가져오기
// router.post('/matchingPostDetail/:matchingPost_id', sendRequest); //산책 요청하기
//요청하기를 누르면 matchingPost_id(params)랑 누른 사람의 id(body) 둘 다 보내야할듯

module.exports = router;
