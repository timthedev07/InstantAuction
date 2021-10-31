import fetch from "node-fetch";
import { readFileSync } from "fs";

export const tryStuff = async () => {
  const readStream = readFileSync(
    "/var/folders/l5/jjw8mvvd5zq1t56yfgxddp_w0000gn/T/yourdogeAppleIcon-512px.png",
    {
      encoding: "binary"
    }
  );
  fetch("https://api.imgur.com/3/image/", {
    method: "post",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
    },
    body: readStream
  })
    .then(data => data.json())
    .then(data => {
      console.log(data.data);
    });
};

tryStuff();
