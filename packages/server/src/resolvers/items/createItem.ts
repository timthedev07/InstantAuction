import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Item } from "../../entity/Item";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { handleImageUpload } from "../../utils/handleImageUpload";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class CreateItemResolver {
  @Mutation(() => Item)
  @UseMiddleware(isAuth)
  async createItem(
    @Arg("name") name: string,
    @Arg("picture", () => GraphQLUpload)
    fileUpload: FileUpload,
    @Ctx() { req }: NetworkingContext
  ): Promise<Item> {
    const userId = req.session.userId!;
    try {
      const picture = await handleImageUpload(fileUpload);
      const {
        generatedMaps: [result]
      } = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Item)
        .values({ owner: await User.findOne(userId), name, picture })
        .returning("*")
        .execute();

      return result as any;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  @Mutation(() => Item)
  @UseMiddleware(isAuth)
  async createItemWithPictureUrl(
    @Arg("name") name: string,
    @Arg("pictureUrl", () => String)
    pictureUrl: string,
    @Ctx() { req }: NetworkingContext
  ): Promise<Item> {
    const userId = req.session.userId!;
    try {
      const { raw } = await Item.insert({
        owner: await User.findOne(userId),
        name,
        picture: pictureUrl
      });

      return await Item.findOne(raw[0].id);
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
