const { model, Schema } = require('mongoose');

const certificationReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewText: {
    type: String,
  },
  // 인증글 삭제시간
  deletedAt: {
    type: Date,
    default: null,
  },
});

// createdAt, updatedAt 자동 설정
certificationReviewSchema.set('timestamps', true);
// 모델 생성
const CertificationReview = model(
  'CertificationReview',
  certificationReviewSchema,
);
// 모델 export
module.exports = CertificationReview;
