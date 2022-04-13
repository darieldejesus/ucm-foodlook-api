import BaseModel from "./baseModel";

class ImageResult extends BaseModel {
  id: number;

  uuid: string;

  detection_id: number;

  title: string;

  url: string;

  created_at: string;

  updated_at: string;

  static tableName = "image_results";
}

export default ImageResult;
