const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const userRouter = require('./routers/userRouter');
const matchingPostRouter = require('./routers/matchingPostRouter.js');
const certificationPostRouter = require('./routers/certificationRouter');
const matchingRequestRouter = require('./routers/matchingRequestRouter.js');
const mainRouter = require('./routers/mainRouter.js');
const myPageRouter = require('./routers/myPageRouter.js');
const uploadRouter = require('./routers/uploadRouter');
const bookMarkRouter = require('./routers/bookMarkRouter.js');

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패: ', error);
  });

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api', (req, res) => {
  res.send('Hello express !');
});
app.use('/api/main', mainRouter);
app.use('/api/users', userRouter);
app.use('/api/myPage', myPageRouter);
app.use('/api/matchingPostLists', matchingPostRouter); // 전체 게시글 불러오기
app.use('/api/matchingPostDetail', matchingPostRouter); // 상세 정보 불러오기 ()
app.use('/api/matchingRequestRouter', matchingRequestRouter); // 매칭글 신청하기
app.use('/api/certificationRouter', certificationPostRouter); // 인증글
app.use('/api/upload', uploadRouter);
app.use('/api/bookMark', bookMarkRouter);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Express server starting on port ${process.env.PORT}`);
});
