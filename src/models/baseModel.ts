import { Model } from "objection";

class BaseModel extends Model {
  static get useLimitInFirst(): boolean {
    return true;
  }
}

export default BaseModel;
