const { model, Schema } = require('mongoose');

const certificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  matchingPost: {
    type: Schema.Types.ObjectId,
    ref: 'MatchingPost',
  },
  certificationImg: [],
  sublocation: {
    type: String,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'CertificationPostReview',
  },
  // 인증글 삭제시간
  deletedAt: {
    type: Date,
    default: null,
  },
});
// createdAt, updatedAt 자동 설정
certificationSchema.set('timestamps', true);
// 모델 생성
const Certification = model('Certification', certificationSchema);
// 모델 export
module.exports = Certification;
