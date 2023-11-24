const { model, Schema } = require('mongoose');

const userDogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dogName: {
    type: String,
    required: true,
  },
  dogImg: {
    type: [],
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
  },
});

// userDogSchema.set('timestamps', true);

const UserDog = model('UserDog', userDogSchema);

console.log(UserDog);

module.exports = UserDog;
