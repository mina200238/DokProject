const { model, Schema } = require('mongoose');
const { schema } = require('./userDog');

const userSchema = new Schema({
  userId: {
    type: String,
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
    type: {
      text: String,
      code: String,
    },
    required: false, // 기본값이 false
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  introduce: {
    type: String,
    default: null,
  },
  isCertificated: {
    type: Boolean,
    default: false,
  },
  userImg: {
    type: String,
    required: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

userSchema.set('timestamps', true);
const User = model('User', userSchema);

module.exports = User;
