import { createConnection, getConnectionOptions } from "typeorm";

export const getTestConnection = async (drop: boolean = false) => {
  return createConnection({
    ...(await getConnectionOptions()),
    dropSchema: drop,
    synchronize: drop
  });
};
