import { createConnection, getConnectionOptions } from "typeorm";
import { __prod__, __test__ } from "../constants/prod";

export const getTestConnection = async (drop: boolean = false) => {
  if (__test__) {
    console.log(await getConnectionOptions());
  }
  return createConnection({
    ...(await getConnectionOptions()),
    dropSchema: drop,
    synchronize: drop
  });
};
