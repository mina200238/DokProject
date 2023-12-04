const { model, Schema } = require('mongoose');

const imgSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

const Img = model('Img', imgSchema);

module.exports = Img;
