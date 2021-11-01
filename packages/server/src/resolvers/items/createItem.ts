import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Item } from "../../entity/Item";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { handleImageUpload } from "../../utils/handleImageUpload";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class CreateItemResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createItem(
    @Arg("name") name: string,
    @Arg("picture", () => GraphQLUpload)
    fileUpload: FileUpload,
    @Ctx() { req }: NetworkingContext
  ) {
    const userId = req.session.userId!;
    try {
      const picture = await handleImageUpload(fileUpload);
      await Item.insert({ owner: await User.findOne(userId), name, picture });

      return true;
    } catch (err) {
      return false;
    }
  }
}
