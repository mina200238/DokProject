const User = require('../models/user/user');

async function createUser(userRequest) {
  try {
    const user = new User({
      //mongoose dao 역할 이자 모델
      userId: userRequest.getUserId(),
      password: userRequest.getPassword(),
      name: userRequest.getName(),
      nickname: userRequest.getNickname(),
    });

    await user.save();
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { createUser };
