const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config');

aws.config = new aws.Config();
aws.config.accessKeyId = config.ACCESS_KEY_ID;
aws.config.secretAccessKey = config.SECRET_ACCESS_KEY;
aws.config.update({
  region: 'us-east-2'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'trove-pictures',
    acl: 'private',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'testing test' });
    },
    key: function (req, file, cb) {
      cb(null, `trove/${Date.now().toString()}`)
    }
  })
})

module.exports = upload;