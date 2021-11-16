import { getTestConnection } from "./testConn";

getTestConnection(true).then(([, startTime]) => {
  const dur = Date.now() - startTime;
  console.log(`DB setup took ${dur}ms`);
  process.exit();
});
