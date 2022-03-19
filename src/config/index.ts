export default {
  databaseURL: process.env.DATABASE_URI,
  s3: {
    bucket: process.env.S3_BUCKET,
    accessKey: process.env.ACCESS_KEY_ID,
    secretKey: process.env.SECRET_ACCESS_KEY_ID,
    region: process.env.REGION,
  },
};
