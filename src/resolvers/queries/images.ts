import { QueryBuilder } from "objection";
import { v4 as uuid } from "uuid";
import SerApi from "google-search-results-nodejs";
import SecretService from "../../services/SecretService";
import DB from "../../config/database";
import Detection from "../../models/detection";
import ImageResult from "../../models/imageResult";

interface Result {
  uuid: string;
  title: string;
  url: string;
}

interface Params {
  detectionUuid: string;
}

async function getImages(query: string) {
  const apiKey = await SecretService.getInstance().getSecret("FL_SERPAPI_KEY");
  if (!apiKey) {
    throw new Error("Unable to get API key.");
  }
  const search = new SerApi.GoogleSearch(apiKey);
  return new Promise((resolve, reject) => {
    try {
      search.json(
        {
          q: query, // search query
          tbm: "isch",
          tbs: "isz:l",
        },
        (response) => {
          resolve(response);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}

const Images = async (_: unknown, params: Params): Promise<Result[]> => {
  const { detectionUuid } = params;
  const knex = await DB.getInstance().getKnex();
  const detectionEntry = await Detection.query(knex).findOne({
    uuid: detectionUuid,
  });
  if (!detectionEntry) {
    throw new Error("Detection not found");
  }
  const detections = await ImageResult.query(knex).where(
    "detection_id",
    detectionEntry.id
  );

  if (detections.length) {
    return detections.map((entry) => ({
      uuid: entry.uuid,
      title: entry.title,
      url: entry.url,
    }));
  }

  const result: any = await getImages(detectionEntry.status);
  if (!result || result.search_metadata.status !== "Success") {
    throw new Error("Unable to get images");
  }

  const images = result.images_results || [];
  if (!images.length) {
    throw new Error("Images not found");
  }

  let promises: QueryBuilder<ImageResult, ImageResult>[] = [];
  images.forEach((entry) => {
    const insert = {
      uuid: uuid(),
      detection_id: detectionEntry.id,
      title: entry.title,
      url: entry.original,
    };
    promises = [...promises, ImageResult.query(knex).insertAndFetch(insert)];
  });

  const imageResult = await Promise.all(promises);

  return imageResult.map((entry) => ({
    uuid: entry.uuid,
    title: entry.title,
    url: entry.url,
  }));
};

export default Images;
