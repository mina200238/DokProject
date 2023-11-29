const UserDog = require('../models/user/userDog');

async function getUserDogByUserId(_id) {
  const findDog = UserDog.find({ user: _id });
  return findDog;
}

async function createUserDog(userDogRequest) {
  const userDog = new UserDog({
    user: userDogRequest.getUserId(),
    dogName: userDogRequest.getDogName(),
    dogImg: userDogRequest.getDogImg(),
    birth: userDogRequest.getBirth(),
    dogType: userDogRequest.getDogType(),
    gender: userDogRequest.getGender(),
    personality: userDogRequest.getPersonality(),
  });

  await userDog.save();
  return userDog;
}

module.exports = { getUserDogByUserId, createUserDog };
