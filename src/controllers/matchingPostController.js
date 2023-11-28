const MatchingPostService = require('../services/matchingPostService');

//매칭 상태 체크 후 , 전체 매칭 글 가져오기  (페이지 네이션)
const getMatchingPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 3,
      locationCode = null,
      walkingDate = null,
    } = req.query;

    const findMatchingPosts = await MatchingPostService.getMatchingPost(
      locationCode,
      walkingDate,
      page,
      perPage,
    );
    res.status(200).json(findMatchingPosts);
  } catch (err) {
    next(err);
  }
};

// 매칭 글 상세정보 가져오기
const getMatchingPostDetails = async (req, res, next) => {
  try {
    const { matchingPostId } = req.params;
    const findMatchingPostDetails =
      await MatchingPostService.getMatchingPostDetails(matchingPostId);

    res.status(200).json(findMatchingPostDetails);
  } catch (err) {
    next(err);
  }
};

// 댓글 가져오기✅
const getComments = async (req, res, next) => {
  try {
    const { matchingPostId } = req.params; //해당 matchingpost의 _id
    const GetComment = await MatchingPostService.getAllComments(matchingPostId);

    res.status(200).json(GetComment);
  } catch (err) {
    next(err);
  }
};

//댓글 작성하기 ✅
const postComment = async (req, res, next) => {
  try {
    const { matchingPostId, user, comment, parentCommentId } = req.body;
    //  댓글을 작성할 때에도 동일한 이름으로 받아와야함
    const postComment = await MatchingPostService.postComment(
      matchingPostId,
      user,
      comment,
      parentCommentId,
    );

    res.status(200).json(postComment);
  } catch (err) {
    next(err);
  }
};

//댓글 수정하기 ✅
const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params; //해당 matchingpost의 __id를 동일한 걸로 받아와야함
    const { comment } = req.body; //수정할 댓글 내용을 body에 담아옴

    const updateComment = await MatchingPostService.updateComment(
      commentId,
      comment,
    );
    res.status(200).json(updateComment);
  } catch (err) {
    next(err);
  }
};

// 댓글 삭제하기 ✅
const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params; //해당 comment의 _id

    const deleteComment = await MatchingPostService.deleteComment(commentId);

    res.status(200).json(deleteComment);
  } catch (err) {
    next(err);
  }
};

//산책 요청 리스트 가져오기
//산책 요청 리스트를 가져오려면,, 해당 matchingPostId를 요청하면, 거기의 요청이 쫙 나오도록
const getRequestLists = async (req, res, next) => {
  try {
    const { matchingPostId } = req.params;

    const getRequestLists =
      await MatchingPostService.getRequestLists(matchingPostId);
    res.status(200).json(getRequestLists);
  } catch (err) {
    next(err);
  }
};

//산책 요청하기 ✅
const postRequest = async (req, res, next) => {
  try {
    const { user, matchingPostId } = req.params;

    const postRequest = await MatchingPostService.postRequest(
      user,
      matchingPostId,
    );

    res.status(200).json(postRequest);
  } catch (err) {
    next(err);
  }
};

//산책 매칭 확정하기
const confirmRequest = async (req, res, next) => {
  try {
    const { matchingPostId, handlerRequestId } = req.params;

    const confirmRequest = await MatchingPostService.confirmRequest(
      matchingPostId,
      handlerRequestId,
    );

    res.status(200).json(confirmRequest);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMatchingPosts,
  getMatchingPostDetails,
  getRequestLists,
  postRequest,
  confirmRequest,
  getComments,
  postComment,
  updateComment,
  deleteComment,
};
