export default {
  databaseURL: process.env.FL_DATABASE_URI,
  s3: {
    bucket: process.env.FL_S3_BUCKET,
    accessKey: process.env.FL_ACCESS_KEY_ID,
    secretKey: process.env.FL_SECRET_ACCESS_KEY_ID,
    region: process.env.FL_REGION,
  },
};
