const { MatchingPost } = require('../models/schemas/matchingPost/matchingPost');
const { MatchingPostComment } = require('../models');
const {
  MatchingHandlerRequest,
} = require('../models/schemas/matchingHandlerRequest/matchingHandlerRequest');

class MatchingPostService {
  //전체 매칭 글 가져오기

  getMatchingPost() {
    const findPost = MatchingPost.find({})
      .populate('user_dog')
      .populate('user');
    return findPost;
  }

  // 댓글 가져오기
  getAllComments(data) {
    const findComments = MatchingPostComment.find({
      matching_post_id: data,
    }).populate('user');

    return findComments;
  }

  //댓글 작성하기
  postComment(data) {
    const postComment = MatchingPostComment.create(data);
    return postComment;
  }

  //댓글 수정하기 댓글의 id값으로 찾은 후 update
  postComment(data, comment_data) {
    const postComment = MatchingPostComment.findOneAndUpdate(
      { _id: data },
      {
        comment: comment_data,
      },
    );
    return postComment;
  }

  //댓글 삭제하기(댓글 진짜 삭제x -> deleted_at 찍히게)
  async postComment(data) {
    const postComment = await MatchingPostComment.findOneAndUpdate(
      { _id: order_id },
      { deleted_at: new Date() },
    );
    return postComment;
  }

  // 해당 게시글의 산책 요청 리스트 가져오기
  matchingPostList(matchingPost_id) {
    const findPostList = MatchingHandlerRequest.find({
      matching_post_id: matchingPost_id,
    }).populate('user');

    return findPostList;
  }

  //산책 요청 보내기
  postRequest(data) {
    const postRequest = MatchingHandlerRequest.create(data);
    return postRequest;
  }
}

module.exports = MatchingPostService;
