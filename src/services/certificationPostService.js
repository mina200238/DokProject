const NotFoundError = require('../errors/notFoundError');
const CertificationPost = require('../models/certificationPost/certificationPost');
const MatchingPost = require('../models/matchingPost/matchingPost');
class CertificationPostService {
  async getCertificationPosts(page, perPage, locationCode, walkingDate) {
    //인증 검색 할 때마다, 날짜 지난거는 'failed'처리

    const currentDate = new Date();
    const nextDay = new Date(walkingDate);
    nextDay.setDate(nextDay.getDate() + 1);

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

    //🙄locationCode랑 walkingDate 둘 다 있을 때
    if (locationCode && walkingDate) {
      //해당 날짜가 지나지 않고, 'failed'가 아닌 MatchingPost의 값만 불러오기

      const result = await MatchingPost.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    {
                      $dateFromString: {
                        dateString: '$walkingDate',
                        format: '%Y-%m-%dT%H:%M:%S.%L',
                      },
                    },
                    new Date(walkingDate),
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
            'location.code': {
              $regex: new RegExp(`${locationCode}`),
            },
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
        .limit(perPage)
        .populate('user')
        .populate('matchingPost')
        .populate({
          path: 'matchingPost',
          populate: { path: 'user' },
        })
        .populate({
          path: 'matchingPost',
          populate: { path: 'userDog' },
        });

      if (!foundDocuments) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }

      return [foundDocuments.length, foundDocuments];
    }

    //🙄 locationCode가 있고, walkingDate가 없을 때
    if (locationCode && !walkingDate) {
      const result = await MatchingPost.aggregate([
        {
          $match: {
            'location.code': {
              $regex: new RegExp(`${locationCode}`),
            },
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
        .limit(perPage)
        .populate('user')
        .populate('matchingPost')
        .populate({
          path: 'matchingPost',
          populate: { path: 'user' },
        })
        .populate({
          path: 'matchingPost',
          populate: { path: 'userDog' },
        });

      if (!foundDocuments) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }

      return [foundDocuments.length, foundDocuments];
    }

    //🙄locationCode가 없고, walkingDate가 있을 때
    if (!locationCode && walkingDate) {
      //해당 날짜가 지나지 않고, 'failed'가 아닌 MatchingPost의 값만 불러오기

      const result = await MatchingPost.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    {
                      $dateFromString: {
                        dateString: '$walkingDate',
                        format: '%Y-%m-%dT%H:%M:%S.%L',
                      },
                    },
                    new Date(walkingDate),
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
        .limit(perPage)
        .populate('user')
        .populate('matchingPost')
        .populate({
          path: 'matchingPost',
          populate: { path: 'user' },
        })
        .populate({
          path: 'matchingPost',
          populate: { path: 'userDog' },
        });

      if (!foundDocuments) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }

      return [foundDocuments.length, foundDocuments];
    }

    //🙄locatonCode와 walkingDate 둘 다 없을 때
    if (!locationCode && !walkingDate) {
      //해당 날짜가 지나지 않고, 'failed'가 아닌 MatchingPost의 값만 불러오기

      const result = await MatchingPost.aggregate([
        {
          $match: {
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
        .limit(perPage)
        .populate('user')
        .populate('matchingPost')
        .populate({
          path: 'matchingPost',
          populate: { path: 'user' },
        })
        .populate({
          path: 'matchingPost',
          populate: { path: 'userDog' },
        });

      if (!foundDocuments) {
        throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
      }

      return [foundDocuments.length, foundDocuments];
    }
  }

  // 상세 인증글 조회
  getCertificationPostDetail(postId) {
    const findCertificationPostDetail = CertificationPost.find({
      _id: postId,
      deletedAt: null,
    })
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
  updateCertificationPost(_id, Data) {
    const updatePost = CertificationPost.findOneAndUpdate(
      {
        _id: _id,
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
  putCertificationPostReview(_id, matchingPost, review) {
    const updatedReview = CertificationPost.findOneAndUpdate(
      {
        matchingPost: _id,
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
