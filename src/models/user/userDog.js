const { model, Schema } = require('mongoose');

const userDogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  dogName: {
    type: String,
    required: true,
  },
  dogImg: {
    type: String,
    required: false,
  },
  birth: {
    type: String,
    required: true,
  },
  dogType: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  personality: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

userDogSchema.set('timestamps', true);
const UserDog = model('UserDog', userDogSchema);

module.exports = { UserDog };
