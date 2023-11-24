class MatchingPostComment {
  constructor(matching_post_id, user, comment, parent_comment_id) {
    if (
      matching_post_id === (null || undefined) ||
      user === (null || undefined) ||
      comment === (null || undefined)
    ) {
      throw new Error('Invalid UserRequest');
    }
    this.matching_post_id = matching_post_id;
    this.user = user;
    this.comment = comment;
    this.parent_comment_id = parent_comment_id;
  }

  getMatchingPostId() {
    //외부에서 인스턴스의 userId를 접근 할 수 있도록 getter를 만들어준다.
    return this.matching_post_id;
  }

  getUser() {
    return this.user;
  }

  getComment() {
    return this.comment;
  }

  getParentCommentId() {
    return this.parent_comment_id;
  }
}

module.exports = MatchingPostComment;
