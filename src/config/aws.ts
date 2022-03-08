import AWS from "aws-sdk";
import Config from "./index";

AWS.config.update({
  accessKeyId: Config.s3.accessKey,
  secretAccessKey: Config.s3.secretKey,
  region: Config.s3.region,
  signatureVersion: "v4",
});

export default AWS;
