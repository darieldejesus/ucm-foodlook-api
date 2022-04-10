import AWS from "../../config/aws";
import FileService from "../../services/FileService";
import SecretService from "../../services/SecretService";

interface Result {
  fileName: string;
  expirationDate: number;
  url: string;
  path: string;
}

interface Params {
  input: {
    fileName: string;
  };
}

const PresignedUrl = async (_: unknown, params: Params): Promise<Result> => {
  const {
    input: { fileName },
  } = params;
  const s3Instance = new AWS.S3();
  const fileService = new FileService({ s3: s3Instance });

  const bucket = await SecretService.getInstance().getSecret("FL_S3_BUCKET");
  if (!bucket) {
    throw new Error("Unable to get S3 Bucket.");
  }

  const presigned = await fileService.presignedUrl({
    fileName,
    bucket,
  });

  return {
    fileName: presigned.name,
    expirationDate: 123523,
    url: presigned.url,
    path: presigned.path,
  };
};

export default PresignedUrl;
