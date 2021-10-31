import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { createWriteStream } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { cyan, red } from "chalk";
import { uploadToImgur } from "../utils/uploadToImgur";

@Resolver()
export class TmpResolvers {
  @Query(() => String)
  hello() {
    return "Hello from your backend";
  }

  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Query(() => Boolean)
  async testUpload(@Arg("file", () => GraphQLUpload)
  {
    createReadStream,
    filename
  }: FileUpload): Promise<boolean> {
    const tempdir = tmpdir();
    const imageBufferPath = join(tempdir, filename);
    return await new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(imageBufferPath))
        .on("finish", async () => {
          cyan(`File written to ${imageBufferPath}`);
          try {
            const link = await uploadToImgur(imageBufferPath);
            console.log(link);
            // do something with the link
            resolve(true);
          } catch (err) {
            red("An error occurred while uploading to imgur: ", err);
            reject(false);
          }
        })
        .on("error", error => {
          red("An error occurred while writing file:", error);
          reject(false);
        });
    });
  }
}
