const {
  CertificationPost,
} = require("../models/certificationPost/certificationPost");
const {} = require("../models/certificationPostReview/certificationPostReview");

class CertificationPostService {
  // 모든 인증글 조회
  getCertificationPosts() {
    const findCertificationPost = CertificationPost.find({})
      .populate("user")
      .populate("matchingPost")
      .populate("review");

    return findCertificationPost;
  }

  // 상세 인증글 조회 ( find부분 수정 필요 )
  getCertificationPostDetail() {
    const findCertificationPostDetail = CertificationPost.find({
      user_id: _id,
    }).populate("review");

    return findCertificationPostDetail;
  }

  // 인증글 생성 (아직 이미지 받아오는 방식이 정해지지 않아서 certificationImg는 작성x)
  postCertificationPost() {
    const { user, matchingPost, sublocation, review, deletedAt } = req.body;

    const newCertificationPost = CertificationPost.create({
      user,
      matchingPost,
      sublocation,
      review,
      deletedAt,
    });

    return newCertificationPost;
  }

  // 검색기능(지역, 날짜, 시간 순으로 sort)
}

module.exports = CertificationPostService;
