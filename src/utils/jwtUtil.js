const jose = require('jose');
const dotenv = require('dotenv');
dotenv.config();

class JwtUtil {
  // encode == generate -> 토큰 생성 == 암호화 알고리즘(비밀번호) => 토큰) SHA256, SHA512
  // decode == parsing
  // verify
  constructor() {
    //문자열을 Buffer로 변환하는 Node.js 메서드
    //Buffer.from()는 기본적으로 UTF-8 인코딩을 사용하며, 만약 JWT_SECRET_KEY가 Base64로 인코딩되어 있다면 올바르게 디코딩해야 한다.
    this.secret = Buffer.from(process.env.JWT_SECRET_KEY, 'base64');
    this.alg = 'HS256';
  }

  async encode(userId) {
    try {
      const token = await new jose.SignJWT({
        alg: this.alg,
        format: 'compact',
      })
        .setProtectedHeader({ alg: this.alg })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime('2h')
        .setSubject(userId)
        .sign(this.secret);
      return token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async decode(token) {
    try {
      const { payload } = await decodeJwt(token, this.secret, this.alg);
      return payload.sub;
    } catch (error) {
      throw error;
    }
  }

  async verify(token) {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      return payload.sub;
    } catch (error) {
      throw error;
    }
  }

  async;
}

module.exports = JwtUtil;