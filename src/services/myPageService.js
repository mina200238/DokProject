const NotFoundError = require('../errors/notFoundError');
const MatchingPost = require('../models/matchingPost/matchingPost');
const CertificationPost = require('../models/certificationPost/certificationPost');
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
            matchingHandler: null,
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

    const result = await MatchingPost.aggregate([
      {
        $match: {
          $and: [
            { user: userId },
            { matchingStatus: 'completed' },
            { deletedAt: null },
          ],
        },
      },
      {
        $project: { _id: 1 },
      },
    ]);

    console.log(result);

    //해당 matchingPost의 id를 가지고 있는 인증글 찾기
    const foundDocuments = await CertificationPost.find({
      matchingPost: { $in: result },
    }).populate('matchingPost');

    if (!foundDocuments) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return [foundDocuments.length, foundDocuments];
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