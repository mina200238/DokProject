const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const MatchingPostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    userDog: {
      type: Schema.Types.ObjectId,
      ref: 'UserDog',
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    location: {
      type: {
        text: String,
        code: String,
      },
      required: true,
    },

    locationDetail: {
      type: String,
    },

    walkingDate: {
      type: String,
      required: true,
    },

    walkingDuration: {
      type: Number,
      required: true,
    },

    requestText: {
      type: String,
      required: true,
    },

    matchingStatus: {
      type: String,
      default: 'in progress',
    },

    matchingHandler: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

const MatchingPost = mongoose.model('MatchingPost', MatchingPostSchema);

module.exports = MatchingPost;
