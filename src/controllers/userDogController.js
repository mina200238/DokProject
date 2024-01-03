const userDogService = require('../services/userDogService');
const userService = require('../services/userService');
const UserDogCreateRequest = require('../dtos/users/userDogCreateRequest');

async function createUserDog(req, res, next) {
  const userId = req.query.userId;
  const _id = req._id;
  const { dogName, dogImg, birth, dogType, gender, personality, note } =
    req.body;

  try {
    const user = _id;
    //const user = await userService.getUserById(_id);
    const userDogRequest = new UserDogCreateRequest(
      user,
      dogName,
      dogImg,
      birth,
      dogType,
      gender,
      personality,
      note,
    );
    const userDog = await userDogService.createUserDog(userDogRequest);
    res.status(201).json(userDog);
  } catch (error) {
    next(error);
  }
}

async function getMyDog(req, res, next) {
  const _id = req._id;
  try {
    const user = await userService.getUserById(_id);
    const userDog = await userDogService.getUserDogByUserId(user);
    res.status(200).json(userDog);
  } catch (error) {
    next(error);
  }
}

async function deleteUserDog(req, res, next) {
  const userDogId = req.query.userDogId;
  const _id = req._id;
  const dogName = req.dogName;
  try {
    const user = await userService.getUserById(_id);
    const userDog = await userDogService.deleteUserDog(user);
    res.status(200).json(userDog);
  } catch (error) {
    next(error);
  }
}

module.exports = { createUserDog, getMyDog, deleteUserDog };
