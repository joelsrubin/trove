const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dli6sknqy',
  api_key: '331246418797862',
  api_secret: 'i7c_hDJmsumt3WsNs4Y-9BtF8qA'
})

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'trove',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
})

module.exports = {
  cloudinary,
  storage
}