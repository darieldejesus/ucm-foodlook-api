import Config from "../../config";
import AWS from "../../config/aws";
import FileService from "../../services/FileService";

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

  const presigned = await fileService.presignedUrl({
    fileName,
    bucket: Config.s3.bucket as string,
  });

  return {
    fileName: presigned.name,
    expirationDate: 123523,
    url: presigned.url,
    path: presigned.path,
  };
};

export default PresignedUrl;
