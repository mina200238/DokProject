const UserCreateRequest = require('../dtos/users/userCreateRequest');
const UserSignInRequest = require('../dtos/users/userSignInRequest');
const UserUpdateRequest = require('../dtos/users/userUpdateRequest');
const MyInfoResponse = require('../dtos/users/myInfoResponse');
const userService = require('../services/userService');
const userDogService = require('../services/userDogService');

async function signUp(req, res, next) {
  const {
    userId,
    password,
    name,
    nickname,
    phoneNumber,
    address,
    introduce,
    isCertificated,
  } = req.body;
  try {
    const userRequest = new UserCreateRequest(
      userId,
      password,
      name,
      nickname,
      phoneNumber,
      address,
      introduce,
      isCertificated,
    );
    const user = await userService.createUser(userRequest);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {
  const { userId, password } = req.body;
  try {
    const userSignInRequest = new UserSignInRequest(userId, password);
    const user = await userService.signIn(res, userSignInRequest);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res, next) {
  try {
    await userService.signOut(res);
  } catch (error) {
    next(error);
  }
}

async function editUserInfo(req, res, next) {
  const _id = req._id;
  try {
    const userUpdateRequest = new UserUpdateRequest(req.body);
    const updatedUser = await userService.editUserInfo(_id, userUpdateRequest);
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  const userId = req.query.userId;
  try {
    const user = await userService.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getMyInfo(req, res, next) {
  const _id = req._id;
  try {
    const user = await userService.getUserById(_id);
    const userDogs = await userDogService.getUserDogByUserId(_id);
    // const myInfoResponse = new MyInfoResponse(user, userDogs);
    // TODO: MyInfoResponse DTO를 만들어서 반환하도록 수정
    // user정보, 개 정보 함께 내려줘야함.
    res.status(200).json({ user, userDogs });
  } catch (error) {
    next(error);
  }
}

module.exports = { signUp, signIn, signOut, editUserInfo, getUser, getMyInfo };
