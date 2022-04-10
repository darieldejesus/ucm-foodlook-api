import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { QueryBuilder } from "objection";
import isEmpty from "lodash/isEmpty";
import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import TextExtractService from "../services/TextExtractService";
import DB from "../config/database";
import PresignedUrl from "../models/presignedUrl";
import File from "../models/file";
import Detection from "../models/detection";

const imageUploadedHandler: APIGatewayProxyHandlerV2 = async (
  event,
  context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const records = (event as any).Records;
  if (isEmpty(records)) {
    return { statusCode: 400 };
  }

  const s3InfoObject = records[0].s3;
  if (isEmpty(s3InfoObject)) {
    return { statusCode: 400 };
  }

  const document = s3InfoObject.object.key;
  const bucket = s3InfoObject.bucket.name;

  const knex = await DB.getInstance().getKnex();
  const presignedFile = await PresignedUrl.query(knex).findOne({
    url: document,
  });

  if (!presignedFile) {
    return { statusCode: 400 };
  }

  const newFile = await File.query(knex).insertAndFetch({
    uuid: uuid(),
    presigned_id: presignedFile.id,
    name: presignedFile.name,
    path: presignedFile.path,
  });

  if (!presignedFile) {
    return { statusCode: 500 };
  }

  const textractInstance = new AWS.Textract();
  const textExtractService = new TextExtractService({
    textract: textractInstance,
  });

  const result = await textExtractService.extractLabels({
    document,
    bucket,
  });

  let insertPromises: QueryBuilder<Detection, Detection>[] = [];
  result.forEach((line) => {
    const insertPromise = Detection.query(knex).insert({
      uuid: uuid(),
      file_id: newFile.id,
      status: line,
    });
    insertPromises = [...insertPromises, insertPromise];
  });
  await Promise.all(insertPromises);

  return { statusCode: 201 };
};

export const handler = imageUploadedHandler;
