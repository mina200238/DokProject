const UserDog = require('../models/user/userDog');

async function getUserDogByUserId(_id) {
  const findDog = UserDog.find({ user: _id });
  return findDog;
}

module.exports = { getUserDogByUserId };
