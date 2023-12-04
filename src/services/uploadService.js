const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: 'dokawsbucket',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        reject('Error uploading image.');
      } else {
        const publicUrl = data.Location;
        resolve(publicUrl);
      }
    });
  });
};

module.exports = {
  uploadImage,
};
