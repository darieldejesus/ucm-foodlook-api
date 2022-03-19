import AWS from "aws-sdk";
import isEmpty from "lodash/isEmpty";

class SecretService {
  private static instance = new SecretService();

  protected client: AWS.SecretsManager | null = null;

  protected secrets: Secret.Secrets | null = null;

  constructor() {
    if (SecretService.instance) {
      throw new Error(
        "Error: Instantiation failed: Use SecretService.getInstance() instead."
      );
    }
    this.client = new AWS.SecretsManager({ region: "us-east-1" });
  }

  static getInstance(): SecretService {
    return SecretService.instance;
  }

  /**
   * Given a file name, creates a Presigned URL from a S3 Bucket.
   * @returns Presigned URL
   */
  async getSecrets(): Promise<Secret.Secrets | null> {
    if (!isEmpty(this.secrets)) {
      return this.secrets;
    }
    if (!this.client) {
      return this.secrets;
    }
    if (!process.env.SECRETS_KEY) {
      throw new Error("SECRETS_KEY not defined");
    }
    const secrets = await this.client
      .getSecretValue({ SecretId: process.env.SECRETS_KEY })
      .promise();

    if (secrets && !isEmpty(secrets.SecretString)) {
      try {
        this.secrets = JSON.parse(secrets.SecretString as string);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(error));
      }
    }
    return this.secrets;
  }

  async getSecret(name: string): Promise<string | null> {
    if (!this.secrets) {
      await this.getSecrets();
    }

    if (!this.secrets || !this.secrets[name]) {
      return null;
    }
    return this.secrets[name];
  }
}

export default SecretService;
