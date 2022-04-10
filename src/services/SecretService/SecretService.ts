import AWS from "aws-sdk";
import isEmpty from "lodash/isEmpty";
import dotenv from "dotenv";

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
    dotenv.config();
    this.client = new AWS.SecretsManager({ region: "us-east-1" });
  }

  static getInstance(): SecretService {
    return SecretService.instance;
  }

  async getRemoteSecrets(): Promise<Secret.Secrets | null> {
    if (!this.client) {
      return this.secrets;
    }
    if (!process.env.SECRETS_KEY) {
      throw new Error("SECRETS_KEY not defined");
    }
    const remoteSecrets = await this.client
      .getSecretValue({ SecretId: process.env.SECRETS_KEY })
      .promise();

    let secrets: Secret.Secrets = {};
    if (remoteSecrets && !isEmpty(remoteSecrets.SecretString)) {
      try {
        secrets = JSON.parse(remoteSecrets.SecretString as string);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(JSON.stringify(error));
      }
    }
    return secrets;
  }

  static getLocalSecrets(): Secret.Secrets | null {
    const secrets = Object.keys(process.env).reduce((acc, key) => {
      if (key.includes("FL_")) {
        return {
          ...acc,
          [key]: process.env[key],
        };
      }
      return acc;
    }, {});
    return secrets;
  }

  /**
   * Loads remote and local environment variables.
   * @returns Object with the environment variables
   */
  async getSecrets(): Promise<Secret.Secrets | null> {
    if (this.secrets) {
      return this.secrets;
    }
    const remoteSecrets = await this.getRemoteSecrets();
    const localSecrets = SecretService.getLocalSecrets();
    this.secrets = {
      ...remoteSecrets,
      ...localSecrets,
    };
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
