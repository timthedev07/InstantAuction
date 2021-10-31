import fetch from "node-fetch";
import { readFileSync } from "fs";

export const uploadToImgur = async (fromPath: string): Promise<string> => {
  // read data in base64 from the given path
  const readStream = readFileSync(fromPath, {
    encoding: "base64"
  });

  return new Promise((resolve, reject) => {
    // call the imgur api
    fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
      },
      body: readStream
    })
      .then(data => data.json())
      .then(data => {
        // grab and return link
        const imgLink = data.data.link;
        resolve(imgLink);
      })
      .catch(reject);
  });
};
