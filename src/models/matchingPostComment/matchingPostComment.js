const { model, Schema } = require('mongoose');

const MatchingPostCommentSchema = new Schema(
  {
    matchingPostId: {
      type: Schema.Types.ObjectId,
      ref: 'MatchingPost',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    parentCommentId: {
      type: String,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
const MatchingPostComment = model(
  'MatchingPostComment',
  MatchingPostCommentSchema,
);
console.log(MatchingPostComment);

module.exports = MatchingPostComment;
