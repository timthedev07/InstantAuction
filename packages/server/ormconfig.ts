const MODE = process.env.NODE_ENV;

const basedir = MODE === "production" ? "dist" : "src";
const fileType = MODE === "production" ? "js" : "ts";

const production = MODE === "production";

module.exports = {
  type: "postgres",
  host: production ? process.env.HP_HOST : "localhost",
  port: 5432,
  username: production
    ? process.env.HP_USERNAME
    : process.env.POSTGRES_USERNAME,
  password: production
    ? process.env.HP_PASSWORD
    : process.env.POSTGRES_PASSWORD,
  database: production ? process.env.HP_DATABASE : "InstantAuction.local",
  entities: [`${basedir}/entity/**/*.${fileType}`],
  migrations: [`${basedir}/migrations/**/*.${fileType}`],
  subscribers: [`${basedir}/subscriber/**/*.${fileType}`],
  cli: {
    entitiesDir: `${basedir}/entity`,
    migrationsDir: `${basedir}/migrations`,
    subscribersDir: `${basedir}/subscriber`
  },
  synchronize: true,
  ssl: production,
  extra: production
    ? {
        ssl: {
          rejectUnauthorized: false
        }
      }
    : undefined
};
