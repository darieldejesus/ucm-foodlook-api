import BaseModel from "./baseModel";

class PresignedUrl extends BaseModel {
  id: number;

  uuid: string;

  name: string;

  path: string;

  url: string;

  expire_at: string;

  created_at: string;

  updated_at: string;

  static tableName = "presigned_urls";
}

export default PresignedUrl;
