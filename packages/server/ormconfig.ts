import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const MODE = process.env.NODE_ENV;
const __prod__ = MODE === "production";
const __cicd__ = process.env.TEST_MODE === "ci-cd";
const __localtest__ = MODE === "test";

const basedir = __prod__ ? "dist" : "src";
const fileType = __prod__ ? "js" : "ts";

const PG_PORT = process.env.POSTGRES_PORT;

/**
 * The production heroku pg url includes
 *  - username
 *  - password
 *  - host
 *  - port
 *  - database
 */

module.exports = {
  type: "postgres",
  ...(__prod__
    ? { url: process.env.DATABASE_URL /* this env var is provided by heroku */ }
    : {
        host: __cicd__ ? process.env.POSTGRES_HOST : "localhost",
        port: __cicd__ && PG_PORT ? parseInt(PG_PORT) : 5432,
        username: __cicd__ ? "postgres" : process.env.POSTGRES_USERNAME,
        password: __cicd__ ? "postgres" : process.env.POSTGRES_PASSWORD,
        database: __cicd__
          ? "postgres"
          : __localtest__
          ? "InstantAuction.test"
          : "InstantAuction.local",
      }),
  entities: [`${basedir}/entity/**/*.${fileType}`],
  migrations: [`${basedir}/migrations/**/*.${fileType}`],
  subscribers: [`${basedir}/subscriber/**/*.${fileType}`],
  cli: {
    entitiesDir: `${basedir}/entity`,
    migrationsDir: `${basedir}/migrations`,
    subscribersDir: `${basedir}/subscriber`,
  },
  synchronize: true,
  ssl: __prod__,
  extra: __prod__
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : undefined,
  // logging: ["error", "query"],
} as PostgresConnectionOptions;
