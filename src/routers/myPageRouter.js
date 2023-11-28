// const { Router } = require('express');
// const {
//   getMatchingPosts,
//   getMatchingPostDetails,
//   getComments,
//   postComment,
//   updateComment,
//   deleteComment,
//   getRequestLists,
//   postRequest,
//   confirmRequest,
// } = require('../controllers/matchingPostController');

// const router = Router();

// //게시글 정렬 관련 기능

// //매칭 메인
// router.get('/', getMatchingPosts); //전체 매칭 글 가져오기(default)

// router.get('/:matchingPostId', getMatchingPostDetails); //상세 게시글 불러오기

// //매칭 디테일
// //댓글 관련 기능

// router.get('/comment/:matchingPostId', getComments); // 댓글 가져오기
// router.post('/comment', postComment); //댓글 작성하기
// router.put('/comment/:commentId', updateComment); //댓글 수정하기
// router.delete('/comment/:commentId', deleteComment); //댓글 삭제하기

// //산책 요청 기능

// router.get('/handler/:matchingPostId', getRequestLists); // 산책 요청 리스트 가져오기
// router.post('/handler/:user/:matchingPostId', postRequest); //산책 요청하기
// router.put('/handler/:matchingPostId/:handlerRequestId', confirmRequest); //산책 요청 확정하기

// module.exports = router;
