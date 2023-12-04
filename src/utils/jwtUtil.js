const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

class JwtUtil {
  // encode == generate -> 토큰 생성 == 암호화 알고리즘(비밀번호) => 토큰) SHA256, SHA512
  // decode == parsing
  // verify
  constructor() {
    //문자열을 Buffer로 변환하는 Node.js 메서드
    //Buffer.from()는 기본적으로 UTF-8 인코딩을 사용하며, 만약 JWT_SECRET_KEY가 Base64로 인코딩되어 있다면 올바르게 디코딩해야 한다.
    this.secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY, 'utf-8');
    this.alg = 'HS256';
  }

  encode(_id) {
    const token = jwt.sign(
      {
        _id: _id,
        iat: Math.floor(Date.now()) / 1000,
      },
      this.secret,
      {
        expiresIn: '12h',
        algorithm: this.alg,
      },
    );
    return token;
  }

  verify(token) {
    return jwt.verify(token, this.secret);
  }
}

module.exports = JwtUtil;
