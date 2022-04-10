import AWS from "aws-sdk";
import trimStart from "lodash/trimStart";

class TextExtractService {
  #textract: AWS.Textract;

  constructor(props: TextExtract.ConstructorProps<AWS.Textract>) {
    const { textract } = props;
    this.#textract = textract;
  }

  /**
   * Given a document, extracts the text via AWS.Textract
   * @param props Document and Bucket
   * @returns List of lines extracted from the document
   */
  async extractLabels(props: TextExtract.ExtractLabelProps): Promise<string[]> {
    const { bucket, document } = props;
    const documentName = trimStart(document, "/");
    const params = {
      Document: {
        S3Object: {
          Bucket: bucket,
          Name: documentName,
        },
      },
      FeatureTypes: ["TABLES", "FORMS"],
    };

    const result = await this.#textract.analyzeDocument(params).promise();
    const rawLines = (result.Blocks || []).map(({ BlockType, Text }) => {
      if (BlockType !== "LINE") return null;
      return Text;
    });

    return rawLines.filter((s) => (s || "").length > 6) as string[];
  }
}

export default TextExtractService;
