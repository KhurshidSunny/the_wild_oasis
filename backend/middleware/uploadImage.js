// middleware/uploadImage.js

const multer = require('multer');
const mime = require('mime-types');
const { v4: uuidv4 } = require('uuid');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../utils/s3');
const AppError = require('../utils/appError');

// Multer config
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  if (!isImage) {
    cb(new AppError('Only image files are allowed!', 400), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter,
});

// Middleware to extract image from `photo` field
exports.uploadImage = upload.single('image'); // same field name for all

// Higher-order middleware to upload to a specific folder
exports.uploadToS3 = (folder) => async (req, res, next) => {
  if (!req.file) return next(new AppError('No file uploaded', 400));

  const fileExt = mime.extension(req.file.mimetype);
  const filename = `${uuidv4()}.${fileExt}`;
  const key = `${folder}/${filename}`;

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await s3.send(command);

    req.file.location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    next();
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};
