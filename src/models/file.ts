import BaseModel from "./baseModel";

class File extends BaseModel {
  id: number;

  uuid: string;

  presigned_id: number;

  name: string;

  path: string;

  created_at: string;

  updated_at: string;

  static tableName = "files";
}

export default File;
