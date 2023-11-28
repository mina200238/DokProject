const NotFoundError = require('../errors/notFoundError');
const CertificationPost = require('../models/certificationPost/certificationPost');
const MatchingPost = require('../models/matchingPost/matchingPost');
class CertificationPostService {
  // 전체 인증글 조회
  async getCertificationPosts(matchingPost, page, perPage) {
    const findMatchingPost = await MatchingPost.find({}).project({ _id: 1 });
    // const findCertificationPost = await CertificationPost.find({
    //   deletedAt: null,
    // })
    //   .populate('user')
    //   .populate('matchingPost')
    //   .sort({ createdAt: -1 }); // 인증글을 createdAt 기준으로 내림차순으로 정렬
    // console.log(findCertificationPost);

    // if (!findCertificationPost) {
    //   throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    // }
    // return findCertificationPost;
  }

  /*
    async getMatchingPost(location, walkingDate, page, perPage) {
    //if문 안에 각각의 메서드로 나눌것
    const date = new Date();

    await MatchingPost.updateMany(
      { walkingDate: { $lt: date } },
      { matchingStatus: 'failed' },
    );

    //둘 다 있을 때
    if (walkingDate && location) {
      const findPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`${location.code}`),
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

    if (!walkingDate && location) {
      const findPost = await MatchingPost.find({
        'location.code': {
          $regex: new RegExp(`${location.code}`),
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

    if (!location && walkingDate) {
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

    if (!location && !walkingDate) {
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
    */

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

module.exports = new CertificationPostService();
