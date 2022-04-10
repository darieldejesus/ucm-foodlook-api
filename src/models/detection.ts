import BaseModel from "./baseModel";

class Detection extends BaseModel {
  id: number;

  uuid: string;

  file_id: number;

  status: string;

  created_at: string;

  updated_at: string;

  static tableName = "detections";
}

export default Detection;
