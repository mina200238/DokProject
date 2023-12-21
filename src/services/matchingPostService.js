const NotFoundError = require('../errors/notFoundError');
const MatchingPost = require('../models/matchingPost/matchingPost');
const MatchingPostComment = require('../models/matchingPostComment/matchingPostComment');
const MatchingHandlerRequest = require('../models/matchingHandlerRequest/matchingHandlerRequest');

class MatchingPostService {
  //🚩날짜 검색 고침
  //전체 매칭 글 가져오기  -> 삭제된 게시글은 가져오지 않기 , 페이지네이션

  async getMatchingPost(locationCode, walkingTime, page, perPage) {
    //if문 안에 각각의 메서드로 나눌것

    const currentDate = new Date();
    const adjustedDate = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);

    const nextDay = new Date(walkingTime);
    nextDay.setDate(nextDay.getDate() + 1);

    await MatchingPost.updateMany(
      {
        $and: [
          {
            matchingStatus: 'process',
          },
          {
            matchingHandler: null,
          },
          {
            $expr: {
              $lte: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                adjustedDate,
              ],
            },
          },
        ],
      },
      {
        $set: {
          matchingStatus: 'failed', // 변경하고자 하는 값으로 설정
        },
      },
    );

    //둘 다 있을 때

    if (walkingTime && locationCode) {
      //해당 데이터의 개수세기
      const countPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`^${locationCode}`),
        },
        $expr: {
          $and: [
            {
              $gt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                new Date(walkingTime),
              ],
            },
            {
              $lt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                nextDay,
              ],
            },
          ],
        },
        deletedAt: null,
      }).count();

      const findPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`^${locationCode}`),
        },
        $expr: {
          $and: [
            {
              $gt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                new Date(walkingTime),
              ],
            },
            {
              $lt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                nextDay,
              ],
            },
          ],
        },
        deletedAt: null,
      })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return [countPost, findPost];
    }

    if (!walkingTime && locationCode) {
      const countPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`^${locationCode}`),
        },
        deletedAt: null,
      }).count();

      const findPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`^${locationCode}`),
        },
        deletedAt: null,
      })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return [countPost, findPost];
    }

    if (!locationCode && walkingTime) {
      //date 검색
      const countPost = await MatchingPost.find({
        $expr: {
          $and: [
            {
              $gt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                new Date(walkingTime),
              ],
            },
            {
              $lt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                nextDay,
              ],
            },
          ],
        },
        deletedAt: null,
      }).count();

      const findPost = await MatchingPost.find({
        $expr: {
          $and: [
            {
              $gt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                new Date(walkingTime),
              ],
            },
            {
              $lt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                nextDay,
              ],
            },
          ],
        },
        deletedAt: null,
      })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return [countPost, findPost];
    }

    //날짜 & 장소 둘 다 없을 때
    if (!locationCode && !walkingTime) {
      const countPost = await MatchingPost.find({ deletedAt: null }).count();

      const findPost = await MatchingPost.find({ deletedAt: null })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('user')
        .populate('userDog');

      if (!findPost) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }
      return [countPost, findPost];
    }
  }

  //매칭 상세정보 불러오기 -> 삭제된 상제 정보는 가져오지 않기
  async getMatchingPostDetails(matchingPostId) {
    const findDetails = await MatchingPost.find({
      _id: matchingPostId,
      deletedAt: null,
    })
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

    return updateComment;
  }

  //댓글 삭제하기(댓글 진짜 삭제x -> deleted_at 찍히게)
  //만약 부모댓글이 삭제되면, 해당 대댓글 모두 deletedAt이 찍히도록
  //commentId를 지우려고 봤는데, 다른 comment에서 parentId로 있는거면? 그거 가지고있는 모든 comment에 deletedAt 찍기

  async deleteComment(commentId) {
    //1. 다른 comment의 parentId로 있는지 확인

    const findComment = await MatchingPostComment.find({
      parentCommentId: commentId,
    }).select({ _id: 1 });

    console.log(findComment);

    //2-1 부모아이디가 아님, 그냥 지우기
    if (findComment.length === 0) {
      const deleteComment = await MatchingPostComment.findOneAndUpdate(
        { _id: commentId },
        { deletedAt: new Date() },
      );

      return deleteComment;
    } else {
      //이쪽에서 문제생김
      const deleteParentComment = await MatchingPostComment.findOneAndUpdate(
        { _id: commentId },
        { deletedAt: new Date() },
      );
      //부모 아이디임,  findComment의 목록에 있는 comment들도 deletedAt 처리할것
      const deleteComment = await MatchingPostComment.updateMany(
        { _id: { $in: findComment } },
        { deletedAt: new Date() },
      );

      return [deleteParentComment, deleteComment];
    }
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
    // 해당 matchingPostId와 user id를 가지고 있는 request document를 찾기
    // const comment = await MatchingHandlerRequest.findOne({
    //   user: handlerRequestId,
    //   matchingPostId: matchingPostId,
    // });

    // console.log(comment.user);
    const confirmMatching = await MatchingPost.findOneAndUpdate(
      { _id: matchingPostId, matchingStatus: { $not: { $eq: 'failed' } } },
      {
        matchingHandler: handlerRequestId,
        matchingStatus: 'completed',
      },
    );
    if (!confirmMatching) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }
    return confirmMatching;
    // return;
  }
}

const matchingPostService = new MatchingPostService();
module.exports = matchingPostService;
