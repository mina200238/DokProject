const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');

const cors = require('cors');
require('dotenv').config();

const app = express();

const userRouter = require('./routers/userRouter');

require('dotenv').config();
// const cors = require('cors');

// const dbFill = require('./dbFill.js');

const matchingPostRouter = require('./routers/matchingPostRouter.js');

// 인증 Router 연결
const certificationPostRouter = require('./routers/certificationRouter');
// mongoose setting
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello express !');
});

app.use('/matchingPostLists', matchingPostRouter); // 전체 게시글 불러오기
app.use('/matchingPostDetail', matchingPostRouter); //댓글
app.use('/api/certificationRouter', certificationPostRouter);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  //   dbFill();
  console.log(`Express server starting on port ${process.env.PORT}`);
});
