class userDogDeleteRequest {
  constructor(id) {
    this.id = id;
    this.deletedAt = null;
  }

  getDeletedAt() {
    return this.deletedAt;
  }

  getId() {
    return this.id;
  }
  setDeletedAt(deletedAt) {
    this.deletedAt = deletedAt;
  }
}
module.exports = userDogDeleteRequest;
