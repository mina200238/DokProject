const { model, Schema } = require('mongoose');

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
    type: String,
    required: false, // 기본값이 false
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
const User = model('User', userSchema);

module.exports = User;
