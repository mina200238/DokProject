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
    phoneNumber: userCreateRequest.getPhoneNumber(),
    address: userCreateRequest.getAddress(),
    userImg: userCreateRequest.getUserImg(),
    introduce: userCreateRequest.getIntroduce(),
    isCertificated: userCreateRequest.getIsCertificated(),
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
  }

  const isMatch = await PasswordEncoder.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthenticationError(
      `비밀번호가 일치하지 않습니다. inputPassword: ${password}`,
    );
  }

  const token = new JwtUtil().encode(user._id);
  res.cookie('token', token, {
    httpOnly: false,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  //res.header('Bearer', ` ${token}`);
  return user;
}

async function signOut(res) {
  res.clearCookie('token');
  return res.status(200).json({ message: '로그아웃 되었습니다.' });
}

async function deleteUser(_id, userDeleteRequest) {
  try {
    const user = await User.findById(_id).exec();
    if (!user) {
      throw new NotFoundError(`존재하지 않는 아이디입니다. inputId: ${_id}`);
    }
    if (!userDeleteRequest.getDeletedAt()) {
      user.deletedAt = new Date();
      await user.save();
    }
    return user;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
}

async function editUserInfo(_id, userUpdateRequest) {
  const encryptedPassword = await PasswordEncoder.hash(
    userUpdateRequest.getPassword(),
  );

  const update = {
    name: userUpdateRequest.getName(),
    userImg: userUpdateRequest.getUserImg(),
    nickname: userUpdateRequest.getNickname(),
    phoneNumber: userUpdateRequest.getPhoneNumber(),
    address: userUpdateRequest.getAddress(),
    password: encryptedPassword,
  };
  const options = { new: true };

  const updatedUser = await User.findByIdAndUpdate(_id, update, options).exec();

  return updatedUser;
}

async function getUser(userId) {
  const user = await User.findOne({ userId: userId }).exec();
  if (falsey(user)) {
    throw new NotFoundError(`존재하지 않는 아이디입니다. inputId: ${userId}`);
  }
  return user;
}

async function getUserById(_id) {
  //const user = User.find({ user: _id }).populate('userImg');
  const user = await User.findById(_id).populate('userImg');
  if (falsey(user)) {
    throw new NotFoundError(`존재하지 않는 아이디입니다. inputId: ${_id}`);
  }
  return user;
}

module.exports = {
  createUser,
  signIn,
  editUserInfo,
  getUser,
  getUserById,
  signOut,
  deleteUser,
};
