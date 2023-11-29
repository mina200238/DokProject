const NotFoundError = require('../errors/notFoundError');
const MatchingPost = require('../models/matchingPost/matchingPost');
const Certification = require('../models/certificationPost/certificationPost');
const UserDog = require('../models/user/userDog');

class MainService {
  //전체 매칭 글 가져오기  -> 삭제된 게시글은 가져오지 않기 , 페이지네이션

  async getMainContents() {
    // //1. 매칭 신청 수 불러오기
    const matchingCount = await MatchingPost.find({}).count(); //6개 성공

    //2. 랜덤 6마리 강아지 정보 불러오기
    const randomDogInfo = await UserDog.aggregate([{ $sample: { size: 3 } }]); //강아지 3마리 성공

    //3. 오늘의 매칭(최신 3개만 불러오기)  .limit(3)
    const latestMatchingPost = await MatchingPost.find({})
      .limit(3)
      .populate('user')
      .populate('userDog'); //최신글 3개 성공

    // 쿼리 실행
    const topCertification = await Certification.find({
      review: { $not: { $eq: null } },
    })
      .sort({ 'review.rating': -1 })
      .limit(3)
      .populate('user')
      .populate('matchingPost');

    if (!randomDogInfo || !latestMatchingPost || !topCertification) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return [matchingCount, randomDogInfo, latestMatchingPost, topCertification];
  }
}

const mainService = new MainService();

module.exports = mainService;
