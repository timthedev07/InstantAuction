import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import { handleImageUpload } from "../utils/handleImageUpload";
import { rateLimit } from "../utils/rateLimit";

@Resolver()
export class TmpResolvers {
  @Query(() => String)
  @UseMiddleware(rateLimit(10))
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
      const link = await handleImageUpload(fileInfo);
      console.log({ link });
      return true;
    } catch (err) {
      return false;
    }
  }
}
