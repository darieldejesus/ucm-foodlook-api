import KnexJs from "knex";
import type { Knex } from "knex";
import { Model } from "objection";
import SecretsService from "../services/SecretService";
import "mysql";

class Database {
  private static dbInstance = new Database();

  protected knexInstance: Knex | null = null;

  constructor() {
    if (Database.dbInstance) {
      throw new Error(
        "Error: Instantiation failed: Use Database.getInstance() instead of new."
      );
    }
    this.initInstance();
  }

  private async initInstance(): Promise<Knex | null> {
    const secrets = await SecretsService.getInstance().getSecrets();
    if (!secrets) {
      return null;
    }
    this.knexInstance = KnexJs({
      client: "mysql",
      pool: { min: 1, max: 1 },
      connection: {
        host: secrets.FL_DATABASE_URI,
        port: 3306,
        user: secrets.FL_DB_USERNAME,
        password: secrets.FL_DB_PASSWORD,
        database: secrets.FL_DB_NAME,
        timezone: "utc",
        charset: "utf8mb4",
      },
      debug: process.env.NODE_ENV !== "production",
    });
    Model.knex(this.knexInstance);
    Database.dbInstance = this;
    return this.knexInstance;
  }

  public static getInstance(): Database {
    return Database.dbInstance;
  }

  public async getKnex(): Promise<Knex | null> {
    if (!this.knexInstance) {
      this.knexInstance = await this.initInstance();
    }
    return this.knexInstance;
  }
}

export default Database;
