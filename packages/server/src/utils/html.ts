import { readFileSync } from "fs";

export const HTMLFileToString: (path: string) => string = (path: string) => {
  const data = readFileSync(path, {
    encoding: "utf8",
  });
  return data;
};
