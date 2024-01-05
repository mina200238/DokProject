const UserCreateRequest = require('../dtos/users/userCreateRequest');
const UserSignInRequest = require('../dtos/users/userSignInRequest');
const UserUpdateRequest = require('../dtos/users/userUpdateRequest');
const UserDeleteRequest = require('../dtos/users/userDeleteRequest');
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

async function deleteUser(req, res, next) {
  const _id = req._id;
  try {
    const userDeleteRequest = new UserDeleteRequest(req.body);
    const user = await userService.deleteUser(_id, userDeleteRequest);
    res.status(201).json(user);
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

async function getUserInfo(req, res, next) {
  const _id = req.params._id;
  try {
    //유저 기본정보
    const user = await userService.getUserById(_id);
    //유저 강아지 정보
    const userDogs = await userDogService.getUserDogByUserId(_id);
    //유저 별점
    const userAverageRating = await userService.calculateAverageRating(_id);
    res.status(200).json({ user, userAverageRating, userDogs });
  } catch (error) {
    next(error);
  }
}

//프로필(사용자 소개)
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

module.exports = {
  signUp,
  signIn,
  signOut,
  editUserInfo,
  getUser,
  getMyInfo,
  getUserInfo,
  deleteUser,
};
