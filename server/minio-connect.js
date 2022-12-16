require("dotenv").config();
const Minio = require("minio");
const minioClient = new Minio.Client({
  port: 9000,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  endPoint: process.env.MINIO_HOST,
  pathStyle: true,
  useSSL: false
});

module.exports = minioClient