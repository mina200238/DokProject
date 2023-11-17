const Schema = require('mongoose');

const matchingPostCommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // 인증글 삭제시간
  deletedAt: {
    type: Date,
    default: null,
  },
});
// createdAt, updatedAt 자동 설정
matchingPostCommentSchema.set('timestamps', true);
// 모델 생성
const MatchingPostComment = mongoose.model(
  'MatchingPostComment',
  matchingPostCommentSchema,
);
// 모델 export
module.exports = MatchingPostComment;
