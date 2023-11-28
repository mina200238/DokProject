const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const MatchingHandlerRequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    matchingPostId: {
      type: Schema.Types.ObjectId,
      ref: 'MatchingPost',
      required: true,
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

// 모델 생성
const MatchingHandlerRequest = mongoose.model(
  'MatchingHandlerRequest',
  MatchingHandlerRequestSchema,
);

module.exports = MatchingHandlerRequest;
