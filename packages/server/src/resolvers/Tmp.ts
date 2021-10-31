import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { handleImageUpload } from "../utils/handleImageUpload";

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
  async testUpload(
    @Arg("file", () => GraphQLUpload)
    fileInfo: FileUpload
  ): Promise<boolean> {
    try {
      await handleImageUpload(fileInfo);
      return true;
    } catch (err) {
      return false;
    }
  }
}
