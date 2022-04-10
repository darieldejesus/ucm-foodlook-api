import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import Database from "../../config/database";
import WpMigrationSource from "../../config/wpMigrationSource";

const migrationConfig = {
  tableName: "knex_migrations",
  migrationSource: new WpMigrationSource(
    require.context("../../../migrations", false, /.ts$/)
  ),
};

const migrateLatest: Handler<APIGatewayProxyEvent, string> = async (
  _event,
  context
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const knexInstance = await Database.getInstance().getKnex();
  let message = "";
  if (!knexInstance) {
    message = "Unable to get DB Instance.";
    console.error(message);
  } else {
    try {
      const output = await knexInstance.migrate.latest(migrationConfig);
      knexInstance.destroy();
      message = `Migration Latest: ${JSON.stringify(output)}`;
      console.info(message);
    } catch (error) {
      message = `Unable to run migration: ${JSON.stringify(error)}`;
      console.error(message);
    }
  }
  return message;
};

export const handler = migrateLatest;
