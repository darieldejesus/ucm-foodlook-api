import DB from "../../config/database";
import File from "../../models/file";
import Detection from "../../models/detection";

interface DetectionEntry {
  uuid: string;
  query: string;
}

interface Result {
  fileName: string;
  path: string;
  lines: DetectionEntry[];
}

interface Params {
  fileName: string;
}

const PresignedUrl = async (_: unknown, params: Params): Promise<Result> => {
  const { fileName } = params;
  const knex = await DB.getInstance().getKnex();
  const fileEntry = await File.query(knex).findOne({ name: fileName });
  if (!fileEntry) {
    throw new Error("File not found");
  }
  const detections = await Detection.query(knex).where("file_id", fileEntry.id);
  const lines = detections.map((entry) => ({
    uuid: entry.uuid,
    query: entry.status,
  }));
  return {
    fileName: fileEntry.name,
    path: fileEntry.path,
    lines,
  };
};

export default PresignedUrl;
