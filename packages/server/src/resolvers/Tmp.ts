import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { createWriteStream } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { tryStuff } from "./try";

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
    filename,
    mimetype
  }: FileUpload): Promise<boolean> {
    console.log({ filename, mimetype, tempdir: tmpdir() });
    const tempdir = tmpdir();
    const imageBufferPath = join(tempdir, filename);
    return await new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(imageBufferPath))
        .on("finish", () => {
          console.log(`File written to ${imageBufferPath}`);
          tryStuff();
          resolve(true);
        })
        .on("error", error => {
          console.log("An error occurred while writing file:", error);
          reject(false);
        });
    });
  }
}
