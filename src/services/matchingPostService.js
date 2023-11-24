const NotFoundError = require('../errors/notFoundError');
const MatchingPost = require('../models/matchingPost/matchingPost');
const MatchingPostComment = require('../models/matchingPostComment/matchingPostComment');
const MatchingHandlerRequest = require('../models/matchingHandlerRequest/matchingHandlerRequest');
const UserDog = require('../models/userDog/userDog');

class MatchingPostService {
  //전체 매칭 글 가져오기  -> Error : user_dog의 populate 안됨
  // MatchingPostService

  async getMatchingPost(location, walkingDate) {
    //if문 안에 각각의 메서드로 나눌것
    if (!walkingDate) {
      const findPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`${location.code}`),
        },
      })
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return findPost;
    }

    if (!location) {
      //date 검색
      const findPost = await MatchingPost.find({
        walkingDate: { $gte: walkingDate },
      })
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return findPost;
    }

    //Error: !locaiton && walkingDate의 case가 적용되지 않음
    if (!location && !walkingDate) {
      console.log('none');
      //콘솔이 찍히지 않음
      const findPost = await MatchingPost.find({})
        .populate('user')
        .populate('userDog');
      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return;
    }
  }

  // 댓글 가져오기 -> 삭제된 댓글은 불러오지 않기
  async getAllComments(matchingPostId) {
    const findComments = await MatchingPostComment.find({
      matchingPostId: matchingPostId, //deletedAt이 찍힌 건 안가져오도록 하는 쿼리 필요!!
    }).populate('user');

    if (!findComments) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return findComments;
  }

  //댓글 작성하기
  async postComment(matchingPostId, user, comment, parentCommentId) {
    const postComment = await MatchingPostComment.create({
      matchingPostId,
      user,
      comment,
      parentCommentId,
    });
    if (!postComment) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return postComment;
  }

  //댓글 수정하기 댓글의 id값으로 찾은 후 update
  async updateComment(commentId, comment) {
    const updateComment = await MatchingPostComment.findOneAndUpdate(
      {
        _id: commentId,
      },
      {
        comment: comment,
      },
      { new: true },
    );
    if (!updateComment) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return updateComment;
  }

  //댓글 삭제하기(댓글 진짜 삭제x -> deleted_at 찍히게)
  async deleteComment(commentId) {
    const deleteComment = await MatchingPostComment.findOneAndUpdate(
      { _id: commentId },
      { deleted_at: new Date() },
    );
    if (!deleteComment) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return deleteComment;
  }

  // 해당 게시글의 산책 요청 리스트 가져오기
  async getRequestLists(matchingPostId) {
    const findPostLists = await MatchingHandlerRequest.find({
      matchingPostId: matchingPostId,
    }).populate('user');
    if (!findPostLists) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return findPostLists;
  }

  //산책 요청 보내기
  async postRequest(user, matchingPostId) {
    const postRequest = await MatchingHandlerRequest.create({
      user,
      matchingPostId,
    });
    if (!postRequest) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return postRequest;
  }

  //산책 요청 확정하기

  async confirmRequest(matchingPostId, commentId) {
    // 해당 matchingPostId를 가지고 있는 comment document를 찾기
    const comment = await MatchingPostComment.findOne({
      _id: commentId,
      matchingPostId: matchingPostId,
    });

    const confirmMatching = await MatchingPost.findOneAndUpdate(
      { _id: matchingPostId },
      {
        matchingHandler: comment.user,
        matchingStatus: '매칭 완료',
      },
    );
    if (!confirmMatching) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return confirmMatching;
  }
}

module.exports = MatchingPostService;
