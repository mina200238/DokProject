//AWS S3 관련 설정 및 파일 업로드
const multer = require('multer');
const multerS3 = require('multer-s3');
const { fromEnv } = require('@aws-sdk/credential-provider-ini');
dotenv = require('dotenv');
dotenv.config();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
//const credentials = fromEnv();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv,
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'dokawsbucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = upload;
