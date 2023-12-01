const NotFoundError = require('../errors/notFoundError');
const MatchingPost = require('../models/matchingPost/matchingPost');
const CertificationPost = require('../models/certificationPost/certificationPost');
// const MatchingHandlerRequest = require('../models/matchingHandlerRequest/matchingHandlerRequest');

class MyPageService {
  //내가 쓴 매칭 포스트 글 불러오기✅
  async getMyMatchingPost(userId) {
    const currentDate = new Date();
    const adjustedDate = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);

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

    // //매칭 포스트의 개수 세기
    // const myMatchingCount = await MatchingPost.find({ user: userId }).count();

    //내가 쓴 매칭글 불러오기

    const myMatchingPosts = await MatchingPost.find({
      user: userId,
    })
      .populate('user')
      .populate('userDog');

    if (!myMatchingPosts) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return [myMatchingPosts.length, myMatchingPosts];
  }

  //내가 작성한 매칭 완료된 매칭 포스트 id들 중에서,  certification 에 해당 matchingPost id가 없을 경우
  async getUncertificatiedList(userId) {
    const currentDate = new Date();
    const adjustedDate = new Date(currentDate.getTime() + 9 * 60 * 60 * 1000);

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

    //내가(Handler) 지원했던 matchingPost 중에 매칭이 완료, 산책 날짜가 지남 , 삭제가 되지 않은 MatchingPost의 id값 가져오기
    const result = await MatchingPost.find({
      matchingHandler: userId,
      $expr: {
        $lt: [
          {
            $dateFromString: {
              dateString: '$walkingDate',
              format: '%Y-%m-%dT%H:%M:%S.%L',
            },
          },
          adjustedDate,
        ],
      },
      matchingStatus: 'completed',
      deletedAt: null,
    }).select({ _id: 1 });

    let uncertificatedMatchingarray = [];
    let certificatedArray = [];

    for (let i = 0; i < result.length; i++) {
      const post = await CertificationPost.find({
        matchingPost: result[i],
      });

      //해당 인증글이 없음 -> 해당 매칭글 정보를 줘야함
      if (!post || post.length === 0) {
        const uncertificatedMatchingPost = await MatchingPost.find({
          _id: { $in: result[i] },
        })
          .populate('user')
          .populate('userDog');

        uncertificatedMatchingarray.push(uncertificatedMatchingPost[0]);
      }
    }

    return [...uncertificatedMatchingarray];
  }

  //내 인증글 불러오기✅
  async getCertificationList(userId) {
    const myCertificationLists = await CertificationPost.find({
      user: userId,
    })
      .populate('user')
      .populate('matchingPost');

    return [myCertificationLists.length, myCertificationLists];
  }
}

const myPageService = new MyPageService();
module.exports = myPageService;
