const NotFoundError = require('../errors/notFoundError');
const CertificationPost = require('../models/certificationPost/certificationPost');
const MatchingPost = require('../models/matchingPost/matchingPost');
class CertificationPostService {
  async getCertificationPosts(page, perPage, locationCode, walkingDate) {
    //인증 검색 할 때마다, 날짜 지난거는 'failed'처리
    const date = new Date();

    await MatchingPost.updateMany(
      { walkingDate: { $lt: date } },
      { matchingStatus: 'failed' },
    );

    if (!locationCode) {
      //해당 날짜가 지나지 않고, 'failed'가 아닌 MatchingPost의 값만 불러오기

      const result = await MatchingPost.aggregate([
        {
          $match: {
            walkingDate: { $gte: walkingDate },
            deletedAt: null,
          },
        },
        {
          $project: { _id: 1 },
        },
      ]);

      //해당 matchingPost의 id를 가지고 있는 인증글 찾기
      const foundDocuments = await CertificationPost.find({
        matchingPost: { $in: result },
      })
        .skip(perPage * (page - 1))
        .limit(perPage);

      return foundDocuments;
    }
  }

  // 상세 인증글 조회
  getCertificationPostDetail(postId) {
    const findCertificationPostDetail = CertificationPost.find(
      {
        _id: postId,
      },
      { deletedAt: null },
    )
      .populate('user')
      .populate('matchingPost');

    if (!findCertificationPostDetail) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return findCertificationPostDetail;
  }

  // 인증글 생성
  postCertificationPost(
    userId,
    matchingPost,
    certificationImg,
    sublocation,
    postText,
    deletedAt,
  ) {
    const newCertificationPost = CertificationPost.create({
      user: userId,
      matchingPost: matchingPost,
      certificationImg,
      sublocation,
      postText,
      deletedAt,
    });
    if (!newCertificationPost) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return newCertificationPost;
  }

  // 인증글 수정
  updateCertificationPost(certificationPostId, Data) {
    const updatePost = CertificationPost.findOneAndUpdate(
      {
        _id: certificationPostId,
      },
      {
        Data,
      },
    );
    if (!updatePost) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return updatePost;
  }

  // 리뷰 생성
  postCertificationPostReview(certificationPostId, review) {
    const newReview = CertificationPost.findOneAndUpdate(
      {
        _id: certificationPostId,
      },
      {
        review,
      },
    );
    if (!newReview) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return newReview;
  }

  // 리뷰 수정
  // 생성 과정과 동일
  putCertificationPostReview(certificationPostId, reviewText, rating) {
    const updatedReview = CertificationPost.findOneAndUpdate(
      {
        _id: certificationPostId,
      },
      {
        review,
      },
    );
    if (!updatedReview) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return updatedReview;
  }
}

module.exports = new CertificationPostService();
