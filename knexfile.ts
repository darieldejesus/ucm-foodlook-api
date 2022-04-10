// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");

dotenv.config();

/**
 * @see http://knexjs.org/#Installation-migrations
 */
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.FL_DATABASE_URI,
      port: 3306,
      user: process.env.FL_DB_USERNAME,
      password: process.env.FL_DB_PASSWORD,
      database: process.env.FL_DB_NAME,
    },
  },
};
