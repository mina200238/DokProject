const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const userRouter = require('./routers/userRouter');

require('dotenv').config();
// const cors = require('cors');

const dbFill = require('./dbFill.js');

const matchingPostRouter = require('./routers/matchingPostRouter.js');
const certificationPostRouter = require('./routers/certificationRouter');
const errorHandler = require('./middlewares/errorHandler');
const matchingRequestRouter = require('./routers/matchingRequestRouter.js');

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패: ', error);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello express !');
});

app.use('/api/users', userRouter);
app.use('/api/matchingPostLists', matchingPostRouter); // 전체 게시글 불러오기
app.use('/api/matchingPostDetail', matchingPostRouter); // 상세 정보 불러오기 ()

app.use('/api/matchingRequestRouter', matchingRequestRouter); // 매칭글 신청하기
app.use('/api/certificationRouter', certificationPostRouter); // 인증글

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  // dbFill();
  console.log(`Express server starting on port ${process.env.PORT}`);
});
