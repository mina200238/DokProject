const MatchingPost = require('../models/matchingPost/matchingPost');
const MatchingHandlerRequest = require('../models/matchingHandlerRequest/matchingHandlerRequest');

class BookMarkService {
  async getMyMatchingPostInfo() {
    // 내가 쓴 매칭 포스트의 리스트 가져오기
    // 각 매칭포스트 id당
  }

  // 북마크-내가 지원한 매칭포스트의 정보
  async getMyApplicationList(userId) {
    //북마크 요청 할 때마다, 날짜 지난거는 'failed'처리

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

    // 해당 유저 아이디를 가지고 있는 매칭글정보 불러오기 (매칭중/ 삭제x )
    const myApplicationList = await MatchingHandlerRequest.find({
      user: userId,
    })
      .populate('matchingPostId')
      .populate({
        path: 'matchingPostId',
        populate: { path: 'userDog' },
      });

    //내가 최근에 지원한 순서대로 주기(추가)

    return myApplicationList;
  }
}
const bookMarkService = new BookMarkService();
module.exports = bookMarkService;
