const { model, Schema } = require('mongoose');
// const shortId = require('shortid');

const userSchema = new Schema({
  userId: {
    type: String,
    // default: shortId.generate,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  introduce: {
    type: String,
    required: false,
  },
  isCertificated: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

userSchema.set('timestamps', true);

module.exports = userSchema;
