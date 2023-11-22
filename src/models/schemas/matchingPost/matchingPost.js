const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const MatchingPostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    user_dog: {
      type: Schema.Types.ObjectId,
      ref: 'user_dog',
      required: true,
    },

    matching_handler_request: {
      type: Schema.Types.ObjectId,
      ref: 'Matching_handler_request',
    },

    matching_post_comment: {
      type: Schema.Types.ObjectId,
      ref: 'Matching_post_comment',
    },

    price: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    location_detail: {
      type: String,
      required: true,
    },

    walking_date: {
      type: String,
      required: true,
    },

    walking_duration: {
      type: Number,
      required: true,
    },

    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const MatchingPost = mongoose.model('MatchingPost', MatchingPostSchema);

module.exports = MatchingPost;
