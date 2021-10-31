import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { createWriteStream } from "fs";
import { tmpdir } from "os";

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
  }: FileUpload) {
    console.log({ filename, mimetype, tempdir: tmpdir() });
    createReadStream().pipe(createWriteStream(filename));
  }
}
