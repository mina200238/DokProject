const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const MatchingHandlerRequestSchema = new Schema(
  {
    matching_post_id: {
      type: Schema.Types.ObjectId,
      ref: 'MatchingPost',
      required: true,
    },

    user_dog: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    parent_comment_id: {
      type: String,
    },

    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// 모델 생성
const MatchingHandlerRequest = mongoose.model(
  'MatchingHandlerRequest',
  MatchingHandlerRequestSchema,
);

module.exports = MatchingHandlerRequest;
