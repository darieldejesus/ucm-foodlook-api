import { APIGatewayProxyHandlerV2 } from "aws-lambda";
// import AWS from "aws-sdk";
// import Config from "../config";
// import TextExtractService from "../services/TextExtractService";

const imageUploadedHandler: APIGatewayProxyHandlerV2 = async (
  _event,
  context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // const textractInstance = new AWS.Textract();
  // const textExtractService = new TextExtractService({
  //   textract: textractInstance,
  // });

  // await textExtractService.extractLabels({
  //   document: "images/2022/03/20220311-194453572-menu.jpeg",
  //   bucket: Config.s3.bucket as string,
  // });

  // Event
  // {
  //   "Records": [
  //       {
  //           "eventVersion": "2.1",
  //           "eventSource": "aws:s3",
  //           "awsRegion": "us-east-1",
  //           "eventTime": "2022-03-12T18:45:35.078Z",
  //           "eventName": "ObjectCreated:Put",
  //           "userIdentity": {
  //               "principalId": "AWS:AIDAYTGKYVEVYL6U6DDD4"
  //           },
  //           "requestParameters": {
  //               "sourceIPAddress": "82.158.208.167"
  //           },
  //           "responseElements": {
  //               "x-amz-request-id": "SWMK2FTQPFBR96FT",
  //               "x-amz-id-2": "kftKAuGVYuAkpYnkLdpyQiZKUeZeua+jrvAG6kqGHqrF2jT4hrIl696Hsjbne0NEUJNdKvONFwc2L5CnaccxJ3EJkgSXoehs"
  //           },
  //           "s3": {
  //               "s3SchemaVersion": "1.0",
  //               "configurationId": "food-look-api-dev-imageUploaded-68a737133cefb25bff959852b8f04754",
  //               "bucket": {
  //                   "name": "food-look-api-dev-imagess3bucket-zk8jabmok60d",
  //                   "ownerIdentity": {
  //                       "principalId": "A13B8PLCWOY3K1"
  //                   },
  //                   "arn": "arn:aws:s3:::food-look-api-dev-imagess3bucket-zk8jabmok60d"
  //               },
  //               "object": {
  //                   "key": "images/2022/03/20220312-184431282-menu.jpeg",
  //                   "size": 13738,
  //                   "eTag": "5a468b9727a1e8adaf4648b1e0455262",
  //                   "sequencer": "00622CEA4F040E5556"
  //               }
  //           }
  //       }
  //   ]
  // }

  // Context
  // {
  //   "callbackWaitsForEmptyEventLoop": false,
  //   "functionVersion": "$LATEST",
  //   "functionName": "food-look-api-dev-imageUploaded",
  //   "memoryLimitInMB": "1024",
  //   "logGroupName": "/aws/lambda/food-look-api-dev-imageUploaded",
  //   "logStreamName": "2022/03/12/[$LATEST]086bfdc746f34e409b1dc24572016bd4",
  //   "invokedFunctionArn": "arn:aws:lambda:us-east-1:590983244075:function:food-look-api-dev-imageUploaded",
  //   "awsRequestId": "bda2b5f1-c04c-45ac-8314-65cd544405e9"
  // }

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

export const handler = imageUploadedHandler;
