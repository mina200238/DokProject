const NotFoundError = require('../errors/notFoundError');
const CertificationPost = require('../models/certificationPost/certificationPost');
const MatchingPost = require('../models/matchingPost/matchingPost');
class CertificationPostService {
  async getCertificationPosts(page, perPage, locationCode, walkingTime) {
    //인증 검색 할 때마다, 날짜 지난거는 'failed'처리

    const currentDate = new Date();
    const nextDay = new Date(walkingTime);
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
    if (locationCode && walkingTime) {
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
                    new Date(walkingTime),
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

      console.log(result);
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
    if (locationCode && !walkingTime) {
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
      console.log(result);

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

    //🙄locationCode가 없고, walkingTime가 있을 때
    if (!locationCode && walkingTime) {
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
                    new Date(walkingTime),
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

      console.log(result);
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
    if (!locationCode && !walkingTime) {
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

      console.log(result);
      //해당 matchingPost의 id를 가지고 있는 인증글 찾기
      const foundDocuments = await CertificationPost.find({
        matchingPost: { $in: result },
      })
        .sort({ createdAt: -1 })
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
    _id,
    matchingPost,
    certificationImg,
    sublocation,
    postText,
  ) {
    const newCertificationPost = CertificationPost.create({
      user: _id,
      matchingPost: matchingPost,
      certificationImg,
      sublocation,
      postText,
    });
    if (!newCertificationPost) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return newCertificationPost;
  }

  // 인증글 수정
  updateCertificationPost(_id, certificationImg, sublocation, postText) {
    const updatePost = CertificationPost.findOneAndUpdate(
      {
        user: _id,
      },
      {
        certificationImg,
        sublocation,
        postText,
      },
      { new: true },
    );
    if (!updatePost) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return updatePost;
  }

  // 리뷰 생성 및 수정
  postPutCertificationPostReview(_id, review) {
    const newReview = CertificationPost.findOneAndUpdate(
      {
        user: _id,
      },
      {
        review,
      },
      { new: true },
    );
    if (!newReview) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return newReview;
  }
}

module.exports = new CertificationPostService();
