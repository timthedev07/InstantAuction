import { createConnection, getConnectionOptions } from "typeorm";
import { __prod__, __test__ } from "../constants/prod";

export const getTestConnection = async (drop: boolean = false) => {
  return createConnection({
    ...(await getConnectionOptions()),
    dropSchema: drop,
    synchronize: drop
  });
};
