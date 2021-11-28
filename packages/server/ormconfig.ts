const MODE = process.env.NODE_ENV;
const __prod__ = MODE === "production";
const __cicd__ = process.env.TEST_MODE === "ci-cd";
const __localtest__ = MODE === "test";
const ON_DOCKER = process.env.ON_DOCKER === "true";

console.log(ON_DOCKER);

const basedir = __prod__ ? "dist" : "src";
const fileType = __prod__ ? "js" : "ts";

const PG_PORT = process.env.POSTGRES_PORT;

module.exports = {
  type: "postgres",
  host: __cicd__
    ? process.env.POSTGRES_HOST
    : __prod__
    ? process.env.HP_HOST
    : ON_DOCKER
    ? "host.docker.internal"
    : "localhost",
  port: __cicd__ && PG_PORT ? parseInt(PG_PORT) : 5432,
  username: __prod__
    ? process.env.HP_USERNAME
    : __cicd__
    ? "postgres"
    : process.env.POSTGRES_USERNAME,
  password: __prod__
    ? process.env.HP_PASSWORD
    : __cicd__
    ? "postgres"
    : process.env.POSTGRES_PASSWORD,
  database: __prod__
    ? process.env.HP_DATABASE
    : __cicd__
    ? "postgres"
    : __localtest__
    ? "InstantAuction.test"
    : "InstantAuction.local",
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
};
