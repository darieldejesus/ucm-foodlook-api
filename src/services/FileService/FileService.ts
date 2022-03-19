import path from "path";
import AWS from "aws-sdk";
import format from "date-fns/format";
import urlJoin from "url-join";
import slugify from "slugify";

class FileService {
  #s3: AWS.S3;

  constructor(props: ConstructorProps<AWS.S3>) {
    const { s3 } = props;
    this.#s3 = s3;
  }

  /**
   * Given a file name, creates a Presigned URL from a S3 Bucket.
   * @returns Presigned URL
   */
  async presignedUrl(props: PresignedUrlProps): Promise<PresignedUrlResult> {
    const { fileName, bucket } = props;
    const folderPath = urlJoin("images", format(new Date(), "yyyy/MM"));
    const dateTimeStr = format(new Date(), "yyyyMMdd-HHmmssSSS");
    const { name, ext } = path.parse(fileName);
    const normalizedName = `${dateTimeStr}-${slugify(name)}${ext}`;
    const fullFilePath = urlJoin(folderPath, normalizedName);
    const url = await this.#s3.getSignedUrlPromise("putObject", {
      Bucket: bucket,
      Key: fullFilePath,
      ContentType: "image/png",
      ACL: "public-read",
    });
    return {
      name: normalizedName,
      extension: ext,
      path: urlJoin("/", fullFilePath),
      url,
    };
  }
}

export default FileService;
