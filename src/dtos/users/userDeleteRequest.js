class UserDeleteRequest {
  constructor(_id, deletedAt = null) {
    this._id = _id;
    this.deletedAt = deletedAt;
  }

  get_id() {
    return this._id;
  }

  getDeletedAt() {
    return this.deletedAt;
  }

  setDeletedAt(deletedAt) {
    this.deletedAt = deletedAt;
  }
}

module.exports = UserDeleteRequest;
