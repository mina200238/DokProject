const UnauthenticationError = require('../errors/unauthenticationError');
const NotFoundError = require('../errors/notFoundError');
const User = require('../models/user/user');
const PasswordEncoder = require('../utils/passwordEncoder');
const JwtUtil = require('../utils/jwtUtil');
const falsey = require('falsey');

async function createUser(userCreateRequest) {
  const encryptedPassword = await PasswordEncoder.hash(
    userCreateRequest.getPassword(),
  );

  const user = new User({
    //mongoose dao 역할 이자 모델
    userId: userCreateRequest.getUserId(),
    password: encryptedPassword,
    name: userCreateRequest.getName(),
    nickname: userCreateRequest.getNickname(),
  });

  await user.save();
  return user;
}

async function signIn(res, userSignInRequest) {
  const userId = userSignInRequest.getUserId();
  const password = userSignInRequest.getPassword();

  const user = await User.findOne({ userId: userId });
  if (falsey(user)) {
    throw new NotFoundError(`존재하지 않는 아이디입니다. inputId: ${userId}`);
    // //다른 계층에서 error 처리하도록 return하지 않고 throw
    // //error: statuscode는 전달할 수 없다
    // throw new Error(`존재하지 않는 아이디입니다. inputId: ${userId}`);
  }

  const isMatch = await PasswordEncoder.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthenticationError(
      `비밀번호가 일치하지 않습니다. inputPassword: ${password}`,
    );
  }
  const jwtUtil = new JwtUtil();
  const token = await jwtUtil.encode(user._id);
  res.header('Bearer', `${token}`);

  return user;
}

module.exports = { createUser, signIn };
