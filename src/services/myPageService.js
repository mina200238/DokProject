// const NotFoundError = require('../errors/notFoundError');
const MatchingPost = require('../models/matchingPost/matchingPost');
const Certification = require('../models/certificationPost/certificationPost');
// const MatchingHandlerRequest = require('../models/matchingHandlerRequest/matchingHandlerRequest');

class MyPageService {
  //내가 쓴 매칭 포스트 글 불러오기✅
  async getMyMatchingPost(userId) {
    const currentDate = new Date();

    await MatchingPost.updateMany(
      {
        $and: [
          {
            matchingStatus: 'progress',
          },
          {
            $expr: {
              $lt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                currentDate,
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

    //매칭 포스트의 개수 세기
    const myMatchingCount = await MatchingPost.find({}).count();

    //내가 쓴 매칭글 불러오기

    const myMatchingPosts = await MatchingPost.find({
      user: userId,
    })
      .populate('user')
      .populate('userDog');

    return [myMatchingCount, myMatchingPosts];
  }

  //내가 작성한 매칭 완료된 매칭 포스트 id들 중에서, certification 에 해당 matchingPost id가 없을 경우
  async getUncertificatiedList(userId) {
    const currentDate = new Date();

    await MatchingPost.updateMany(
      {
        $and: [
          {
            matchingStatus: 'progress',
          },
          {
            $expr: {
              $lt: [
                {
                  $dateFromString: {
                    dateString: '$walkingDate',
                    format: '%Y-%m-%dT%H:%M:%S.%L',
                  },
                },
                currentDate,
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

    //인증글의 개수 세기
    const myMatchingCount = await MatchingPost.find({}).count();

    //내가 쓴 인증글 불러오기

    const myMatchingPosts = await MatchingPost.find({
      user: userId,
    })
      .populate('user')
      .populate('userDog');

    return [myMatchingCount, myMatchingPosts];
  }

  //내 인증글 불러오기✅
  async getCertificationList(userId) {
    const myCertificationLists = await Certification.find({
      user: userId,
    })
      .populate('user')
      .populate('matchingPost');

    return [myCertificationLists.length, myCertificationLists];
  }
}

const myPageService = new MyPageService();
module.exports = myPageService;
