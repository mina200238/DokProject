const { BadRequestError } = require('../errors/badReqestError');
const uploadService = require('../services/uploadService');
const Img = require('../models/image/image');
const User = require('../models/user/user');

const uploadImage = async (req, res, next) => {
  try {
    const _id = req._id;
    //const user = await User.findById(_id).exec();

    const files = req.files;

    if (!files || files.length === 0) {
      throw new BadRequestError('No file uploaded.');
    }
    const savedImages = [];

    for (const file of files) {
      const imageUrl = await uploadService.uploadImage(file);

      if (!imageUrl) {
        throw new InternalServerError('Error uploading image.');
      }

      // const newImage = new Img({
      //   user: _id,
      //   imageURL: imageUrl,
      // });
      // //const savedImage = await newImage.save();
      savedImages.push(imageUrl);
    }

    return res.status(200).send(savedImages);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { uploadImage };
