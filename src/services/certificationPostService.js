const CertificationPost = require('../models/certificationPost/certificationPost');

class CertificationPostService {
  // 전체 인증글 조회
  getCertificationPosts() {
    const findCertificationPost = CertificationPost.find({})
      .populate('user')
      .populate('matchingPost')
      .sort({ createdAt: -1 }); // 인증글을 createdAt 기준으로 내림차순으로 정렬
    const getCertificationPosts = findCertificationPost.find({
      deletedAt: null,
    });

    return getCertificationPosts;
  }

  // 상세 인증글 조회
  getCertificationPostDetail(postId) {
    const findCertificationPostDetail = CertificationPost.find({
      _id: postId,
    }).populate('review');

    return findCertificationPostDetail;
  }

  // 인증글 생성 (아직 이미지 받아오는 방식이 정해지지 않아서 certificationImg는 작성x)
  postCertificationPost(
    user,
    matchingPost,
    sublocation,
    postText,
    review,
    deletedAt,
  ) {
    const newCertificationPost = CertificationPost.create({
      user,
      matchingPost,
      sublocation,
      postText,
      review,
      deletedAt,
    });

    return newCertificationPost;
  }

  // 인증글 삭제
  // deleteCertificationPost(certificationPostId) {
  //   const removePost = CertificationPost.updateOne(
  //     {
  //       _id: certificationPostId,
  //     },
  //     {
  //       deletedAt: Date.now(),
  //     },
  //   );

  //   return removePost;
  // }

  // 리뷰 생성
  postCertificationPostReview(certificationPostId, reviewText, score) {
    const newReview = CertificationPost.updateOne(
      {
        _id: certificationPostId,
      },
      {
        reviewText,
        score,
      },
    );

    return newReview;
  }

  // 리뷰 수정
  // 생성 과정과 동일
  putCertificationPostReview(certificationPostId, reviewText) {
    const updatedReview = CertificationPost.updateOne(
      {
        _id: certificationPostId,
      },
      {
        reviewText,
        score,
      },
    );

    return updatedReview;
  }

  // 검색기능
  // 지역 선택
  locationCertificationPost() {
    const { location } = req.body;

    const locationCertificationPost = CertificationPost.find({
      location: location,
    })
      .populate('user')
      .populate('matchingPost')
      .populate('review');
    const getCertificationPosts = locationCertificationPost.find({
      deletedAt: null,
    });

    return getCertificationPosts;
  }

  // 날짜 선택
  dateCertificationPost(createdAt) {
    const dateCertificationPost = CertificationPost.find({
      createdAt: createdAt,
    })
      .populate('user')
      .populate('matchingPost');
    const getCertificationPosts = dateCertificationPost.find({
      deletedAt: null,
    });

    return getCertificationPosts;
  }

  // 오래된순 (기본은 최신순)
  getCertificationPosts() {
    const findCertificationPost = CertificationPost.find({})
      .populate('user')
      .populate('matchingPost')
      .sort({ createdAt: 1 }); // 인증글을 createdAt 기준으로 오름차순으로 정렬
    const getCertificationPosts = findCertificationPost.find({
      deletedAt: null,
    });

    return getCertificationPosts;
  }
}

module.exports = CertificationPostService;
