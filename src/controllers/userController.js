const userService = require('../services/userService');
const UserCreateRequest = require('../dtos/users/userCreateRequest');
const UserSignInRequest = require('../dtos/users/userSignInRequest');
const falsey = require('falsey');

async function signUp(req, res) {
  const { userId, password, name, nickname } = req.body;
  try {
    const userRequest = new UserCreateRequest(userId, password, name, nickname);
    const user = await userService.createUser(userRequest);
    res.status(201).json(user);
  } catch (error) {
    if (falsey(error.getStatusCode)) {
      res.status(500).json(error.message);
      return;
    }
    // res.status(error.getStatusCode()).json(error.getMessage());
  }
}

async function signIn(req, res) {
  const { userId, password } = req.body;
  try {
    const userSignInRequest = new UserSignInRequest(userId, password);
    const user = await userService.signIn(res, userSignInRequest);
    res.status(201).json(user);
  } catch (error) {
    // next(error);
    if (error.getStatusCode() === 404) {
      res.status(404).json(error.message);
    } else if (falsey(error.getStatusCode)) {
      res.status(500).json(error.message); //우리가 모르는 에러는 500으로 던진다
    } else {
      res.status(error.getStatusCode()).json(error.getMessage()); //커스텀에러 상속받은 모든 에러
    }
  }
}

module.exports = { signUp, signIn };
//error middleware 사용하여 더이상 코드 작성 하지 않을 정도로 정리해보기
