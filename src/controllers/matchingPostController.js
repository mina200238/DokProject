const MatchingPostService = require('../services/matchingPostService');

//전체 매칭 글 가져오기
const getMatchingPosts = async (req, res) => {
  const matchingPostService = new MatchingPostService();
  const findMatchingPosts = await matchingPostService.getMatchingPost;

  res.status(200).json({
    data: { matchingPost_id: findMatchingPosts._id },
    message: '전체 매칭 글입니다',
  });
};

// 댓글 가져오기
const getComments = async (req, res) => {
  const data = req.query; //해당 matchingpost의 _id
  console.log(data);
  const matchingPostService = new MatchingPostService();
  const GetComment = await matchingPostService.getAllComments(data);

  res.status(200).json({
    data: { GetComment },
    message: '댓글 리스트 입니다',
  });
};

//댓글 작성하기
const postComment = async (req, res) => {
  const data = req.body; // 작성할 댓글 관련 정보를 body에 담아옴
  const matchingPostService = new MatchingPostService();
  const postComment = await matchingPostService.postComment(data);
  res.status(200).json({
    data: { comment_id: postComment._id },
    message: '댓글이 등록되었습니다',
  });
};

//댓글 수정하기
const updateComment = async (req, res) => {
  const data = req.params; //해당 matchingpost의 _id
  const comment_data = req.body; //수정할 댓글 내용을 body에 담아옴
  const matchingPostService = new MatchingPostService();
  const postComment = await matchingPostService.postComment(data, comment_data);

  res.status(200).json({
    data: { comment_id: postComment._id },
    message: '댓글이 성공적으로 수정되었습니다',
  });
};

// 댓글 삭제하기
const deleteComment = async (req, res) => {
  const data = req.params; //해당 matchingpost의 _id
  const comment_data = req.body; //댓글 관련 정보를 body에 담아옴
  const matchingPostService = new MatchingPostService();
  const postComment = await matchingPostService.postComment(data, comment_data);

  res.status(200).json({
    data: { comment_id: postComment._id },
    message: '댓글이 성공적으로 삭제되었습니다',
  });
};

// 산책 요청 리스트 가져오기
//산책 요청 리스트를 가져오려면,, 해당 게시글의 아이디를 요청하면, 거기의 요청이 쫙 나오도록
const getRequestLists = async (req, res) => {
  const id = req.body; //게시글을 누른 사람의 id
  const matchingPost_id = req.params;

  if (id === matchingPostData.user._id) {
    const matchingPostService = new MatchingPostService();
    const postComment = await matchingPostService.getComment(matchingPost_id);

    res.status(200).json({
      data: { postComment },
      message: `${matchingPost_id}의 요청 리스트입니다.`,
    });
  }
};

//산책 요청하기
const sendRequest = async (req, res) => {
  const { matchingPost_id } = req.params;
  const matchingPostService = new MatchingPostService();
  const postComment = await matchingPostService.getComment(matchingPost_id);

  res.status(200).json({
    data: { postComment },
  });
};

module.exports = {
  getMatchingPosts,
  getRequestLists,
  sendRequest,
  getComments,
  postComment,
  updateComment,
  deleteComment,
};
