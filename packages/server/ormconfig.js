const MODE = process.env.NODE_ENV;

const basedir = MODE === "production" ? "dist" : "src";
const fileType = MODE === "production" ? "js" : "ts";

const production = MODE === "production";

const DB_URl = process.env.DATABASE_URL;

const parseHeroku = (url) => {
  url = url.slice(11);

  const [username, a, b] = url.split(":");

  const [password, host] = a.split("@");
  const [port, database] = b.split("/");

  const res = {
    host,
    port,
    username,
    password,
    database,
  };

  return res;
};

const {
  username: HP_USERNAME,
  password: HP_PASSWORD,
  database: HP_DATABASE,
  host: HP_HOST,
  port: HP_PORT,
} = parseHeroku(DB_URl);

const config = {
  type: "postgres",
  host: production ? HP_HOST : "localhost",
  port: production ? parseInt(HP_PORT) : 5432,
  username: production ? HP_USERNAME : process.env.POSTGRES_USERNAME,
  password: production ? HP_PASSWORD : process.env.POSTGRES_PASSWORD,
  database: production ? HP_DATABASE : "auth-api-template",
  entities: [`${basedir}/entity/**/*.${fileType}`],
  migrations: [`${basedir}/migrations/**/*.${fileType}`],
  subscribers: [`${basedir}/subscriber/**/*.${fileType}`],
  cli: {
    entitiesDir: `${basedir}/entity`,
    migrationsDir: `${basedir}/migrations`,
    subscribersDir: `${basedir}/subscriber`,
  },
  synchronize: true,
  ssl: production,
  extra: production
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : undefined,
};

module.exports = config;
