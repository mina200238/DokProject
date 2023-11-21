const bcrypt = require("bcrypt");
const User = require("./user");

async function makeHash(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const createUser = async (
  userId,
  password,
  name,
  nickname,
  address,
  phoneNumber,
  introduce,
  isCertificated
) => {
  //유효성검사
  const hashedPassword = await makeHash(password);
  const newUser = await User.create({
    userId,
    password: hashedPassword,
    // name,
    // nickname,
    // address,
    // phoneNumber,
    // introduce,
    // isCertificated,
  });

  return newUser;
};

module.exports = { createUser };
