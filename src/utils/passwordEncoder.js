const bcrypt = require('bcrypt');

class PasswordEncoder {
  static async hash(password) {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }

  static async compare(inputPassword, encryptedPassword) {
    // general 한 util 클래스는 static 으로 선언하여 사용하는 것이 좋음 for memory
    //new 키워드로 password 관련 함수 호출시 메모리에 각자 다른 인스턴스 올라감 : 개별적으로 변경 가능성 생김 (js : public, private x)
    return await bcrypt.compare(inputPassword, encryptedPassword);
  }
}

module.exports = PasswordEncoder;
