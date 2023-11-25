const MatchingPostService = require('../services/matchingPostService');

//전체 매칭 글 가져오기
const getMatchingPosts = async (req, res) => {
  try {
    const { location, walkingDate } = req.body;
    const matchingPostService = new MatchingPostService();
    const findMatchingPosts = await matchingPostService.getMatchingPost(
      location,
      walkingDate,
    );
    res.status(200).json({
      data: { findMatchingPosts },
      message: '전체 매칭 글입니다',
    });
  } catch (err) {
    next(err);
  }
};

// 댓글 가져오기✅
const getComments = async (req, res) => {
  try {
    const { matchingPostId } = req.params; //해당 matchingpost의 _id
    const matchingPostService = new MatchingPostService();
    const GetComment = await matchingPostService.getAllComments(matchingPostId);

    res.status(200).json({
      data: GetComment,
      message: '댓글 리스트 입니다',
    });
  } catch (err) {
    next(err);
  }
};

//댓글 작성하기 ✅
const postComment = async (req, res) => {
  try {
    const { matchingPostId, user, comment, parentCommentId } = req.body;
    //  댓글을 작성할 때에도 동일한 이름으로 받아와야함
    const matchingPostService = new MatchingPostService();
    const postComment = await matchingPostService.postComment(
      matchingPostId,
      user,
      comment,
      parentCommentId,
    );

    res.status(200).json({
      data: { postComment },
      message: '댓글이 등록되었습니다',
    });
  } catch (err) {
    next(err);
  }
};

//댓글 수정하기 ✅
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params; //해당 matchingpost의 __id를 동일한 걸로 받아와야함
    const { comment } = req.body; //수정할 댓글 내용을 body에 담아옴

    const matchingPostService = new MatchingPostService();
    const updateComment = await matchingPostService.updateComment(
      commentId,
      comment,
    );
    res.status(200).json({
      data: { comment: updateComment },
      message: '댓글이 성공적으로 수정되었습니다',
    });
  } catch (err) {
    next(err);
  }
};

// 댓글 삭제하기 ✅
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params; //해당 comment의 _id

    const matchingPostService = new MatchingPostService();
    const deleteComment = await matchingPostService.deleteComment(commentId);

    res.status(200).json({
      data: { deleteComment },
      message: '댓글이 성공적으로 삭제되었습니다',
    });
  } catch (err) {
    next(err);
  }
};

//산책 요청 리스트 가져오기
//산책 요청 리스트를 가져오려면,, 해당 matchingPostId를 요청하면, 거기의 요청이 쫙 나오도록
const getRequestLists = async (req, res) => {
  try {
    const { matchingPostId } = req.params;
    const matchingPostService = new MatchingPostService();
    const getRequestLists =
      await matchingPostService.getRequestLists(matchingPostId);
    res.status(200).json({
      data: { getRequestLists },
      message: `${matchingPostId}의 요청 리스트입니다.`,
    });
  } catch (err) {
    next(err);
  }
};

//산책 요청하기 ✅
const postRequest = async (req, res) => {
  try {
    const { user, matchingPostId } = req.params;
    const matchingPostService = new MatchingPostService();
    const postRequest = await matchingPostService.postRequest(
      user,
      matchingPostId,
    );

    res.status(200).json({
      data: { postRequest },
      message: '산책 요청이 완료되었습니다',
    });
  } catch (err) {
    next(err);
  }
};

//산책 매칭 확정하기
const confirmRequest = async (req, res) => {
  try {
    const { matchingPostId, commentId } = req.params;
    const matchingPostService = new MatchingPostService();
    const confirmRequest = await matchingPostService.confirmRequest(
      matchingPostId,
      commentId,
    );

    console.log(confirmRequest);
    res.status(200).json({
      data: { confirmRequest },
      message: '산책 매칭이 확정되었습니다',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMatchingPosts,
  getRequestLists,
  postRequest,
  confirmRequest,
  getComments,
  postComment,
  updateComment,
  deleteComment,
};
