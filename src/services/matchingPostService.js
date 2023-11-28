const NotFoundError = require('../errors/notFoundError');
const MatchingPost = require('../models/matchingPost/matchingPost');
const MatchingPostComment = require('../models/matchingPostComment/matchingPostComment');
const MatchingHandlerRequest = require('../models/matchingHandlerRequest/matchingHandlerRequest');

class MatchingPostService {
  //전체 매칭 글 가져오기  -> 삭제된 게시글은 가져오지 않기 , 페이지네이션

  async getMatchingPost(locationCode, walkingDate, page, perPage) {
    //if문 안에 각각의 메서드로 나눌것
    const date = new Date();

    await MatchingPost.updateMany(
      { walkingDate: { $lt: date } },
      { matchingStatus: 'failed' },
    );

    //둘 다 있을 때
    if (walkingDate && locationCode) {
      const findPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`${locationCode}`),
        },
        walkingDate: { $gte: walkingDate },
        deletedAt: null,
      })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return findPost;
    }

    if (!walkingDate && locationCode) {
      const findPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`${locationCode}`),
        },
        deletedAt: null,
      })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return findPost;
    }

    if (!locationCode && walkingDate) {
      //date 검색

      const findPost = await MatchingPost.find({
        walkingDate: { $gte: walkingDate },
        deletedAt: null,
      })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return findPost;
    }

    if (!locationCode && !walkingDate) {
      const findPost = await MatchingPost.find({ deletedAt: null })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return findPost;
    }
  }

  //매칭 상세정보 불러오기 -> 삭제된 상제 정보는 가져오지 않기
  async getMatchingPostDetails(matchingPostId) {
    const findDetails = await MatchingPost.find(
      {
        _id: matchingPostId,
      },
      { deletedAt: null },
    )
      .populate('user')
      .populate('userDog');

    if (!findDetails) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return findDetails;
  }

  // 댓글 가져오기 -> 삭제된 댓글은 불러오지 않기
  async getAllComments(matchingPostId) {
    const findComments = await MatchingPostComment.find({
      matchingPostId: matchingPostId,
      deletedAt: null,
    }).populate('user');

    console.log(findComments);
    if (findComments.length === 0) {
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
    }).populate(user);

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
      { deletedAt: new Date() },
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

  async confirmRequest(matchingPostId, handlerRequestId) {
    // 해당 matchingPostId를 가지고 있는 comment document를 찾기
    const comment = await MatchingHandlerRequest.findOne({
      _id: handlerRequestId,
      matchingPostId: matchingPostId,
    });

    const confirmMatching = await MatchingPost.findOneAndUpdate(
      { _id: matchingPostId },
      {
        matchingHandler: comment.user,
        matchingStatus: 'completed',
      },
    );
    if (!confirmMatching) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return confirmMatching;
  }
}

const matchingPostService = new MatchingPostService();
module.exports = matchingPostService;
