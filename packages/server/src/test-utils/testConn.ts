import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const getTestConnection = async (
  drop: boolean = false
): Promise<[Connection, number]> => {
  const startTime = Date.now();
  return [
    await createConnection({
      ...(await getConnectionOptions()),
      dropSchema: drop,
      synchronize: drop,
    }),
    startTime,
  ];
};
