export default {
  databaseURL: process.env.DATABASE_URI,
  s3: {
    bucket: process.env.AWS_S3_BUCKET,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  },
};
