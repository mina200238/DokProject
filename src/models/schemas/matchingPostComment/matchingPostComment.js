// const { model, Schema } = require('mongoose');

// const MatchingPostCommentSchema = new Schema(
//   {
//     matching_post_id: {
//       type: Schema.Types.ObjectId,
//       ref: 'MatchingPost',
//       required: true,
//     },

//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },

//     comment: {
//       type: String,
//       required: true,
//     },

//     parent_comment_id: {
//       type: String,
//     },

//     deleted_at: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const MatchingPostComment = model(
//   'matchingPostComment',
//   MatchingPostCommentSchema,
// );

// module.exports = MatchingPostComment;
