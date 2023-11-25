const userDogService = require('../services/userDogService');
const userService = require('../services/userService');
const UserDogCreateRequest = require('../dtos/userDogs/userDogCreateRequest');

async function createUserDog(req, res, next) {
  const _id = req._id;
  const dog = req.body;

  try {
    //TODO
    const user = await userService.getUserById(_id);
    const userDogRequest = new UserDogCreateRequest(user, dog);
    const userDog = await userDogService.createUserDog(userDogRequest);
    res.status(201).json(userDog);
  } catch (error) {
    next(error);
  }
}

module.exports = { createUserDog };
