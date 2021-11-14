import { createConnection, getConnectionOptions } from "typeorm";
import { __prod__ } from "../constants/prod";

export const getTestConnection = async (drop: boolean = false) => {
  return createConnection({
    ...(await getConnectionOptions()),
    dropSchema: drop,
    synchronize: drop,
    database: (__prod__
      ? process.env.HP_DATABASE
      : "InstantAuction.test") as any
  });
};
