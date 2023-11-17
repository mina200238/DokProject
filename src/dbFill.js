// // 테스트 데이터를 db에 채워넣기 위함!!

// const fakeComment = require('./static/fakeComment.json');
// const fakeUser = require('./static/fakeUser.json');

// const MatchingPostComment = require('./models/schemas/matchingPostComment/matchingPostComment');
// const User = require('./models/schemas/user/user');
// // const { , User } = require('./models');

// const dbFill = async (req, res) => {
//   // const commentData = await MatchingPostComment.countDocuments().exec();
//   // console.log(commentData);
//   // if (!commentData) {}
//   await MatchingPostComment.insertMany(fakeComment.data);
//   console.log('댓글 데이터 성공...');

//   await User.insertMany(fakeUser.data);
//   console.log('유저 데이터 성공...');
// };

// module.exports = dbFill;
