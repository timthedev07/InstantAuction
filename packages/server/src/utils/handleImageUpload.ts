import { tmpdir } from "os";
import { join } from "path";
import { ReadStream } from "fs-capacitor";
import { createWriteStream } from "fs";
import { cyan, red } from "chalk";
import { uploadToImgur } from "./uploadToImgur";

interface Args {
  filename: string;
  createReadStream(): ReadStream;
}

/**
 *
 * Given a filename and a function `createReadStream` from graphql-upload,
 * read and upload the image to imgur.
 *
 * @returns
 */
export const handleImageUpload = async ({
  filename,
  createReadStream
}: Args): Promise<string> => {
  const tempdir = tmpdir();
  const imageBufferPath = join(tempdir, filename);
  return await new Promise(async (resolve, reject) => {
    createReadStream()
      .pipe(createWriteStream(imageBufferPath))
      .on("finish", async () => {
        cyan(`File written to ${imageBufferPath}`);
        try {
          const link = await uploadToImgur(imageBufferPath);
          resolve(link);
        } catch (err) {
          red("An error occurred while uploading to imgur: ", err);
          reject(err);
        }
      })
      .on("error", error => {
        red("An error occurred while writing file:", error);
        reject(error);
      });
  });
};
