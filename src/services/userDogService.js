const UserDog = require('../models/user/userDog');

async function getUserDogByUserId(_id) {
  const findDog = UserDog.find({ user: _id }).populate('dogImg');
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
    note: userDogRequest.getNote(),
    personality: userDogRequest.getPersonality(),
  });

  await userDog.save();
  return userDog;
}

async function deleteUserDog(_id, userDogDeleteRequest) {
  try {
    db.컬렉션.find({ target: 'A' });
    const userDog = await UserDog.findById(_id).exec();
    if (!userDog) {
      throw new NotFoundError(
        `존재하지 않는 멍멍이 아이디. inputId: ${userDog}`,
      );
    }
    if (!userDogDeleteRequest.getDeletedAt()) {
      userDog.deletedAt = new Date();
      await userDog.save();
    }
    return user;
  } catch (error) {
    console.error('Error deleting userDog:', error.message);
    throw error;
  }
}
module.exports = { getUserDogByUserId, createUserDog, deleteUserDog };
