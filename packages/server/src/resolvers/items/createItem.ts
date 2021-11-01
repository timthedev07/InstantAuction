import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Item } from "../../entity/Item";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { handleImageUpload } from "../../utils/handleImageUpload";
import { isAuth } from "../../utils/isAuthMiddleware";
import { UserItemsResponse } from "./getUserItems";

@Resolver()
export class CreateItemResolver {
  @Mutation(() => UserItemsResponse)
  @UseMiddleware(isAuth)
  async createItem(
    @Arg("name") name: string,
    @Arg("picture", () => GraphQLUpload)
    fileUpload: FileUpload,
    @Ctx() { req }: NetworkingContext
  ): Promise<UserItemsResponse> {
    const userId = req.session.userId!;
    try {
      const picture = await handleImageUpload(fileUpload);
      await Item.insert({
        name,
        picture,
        owner: await User.findOne(userId)
      });
      const repo = getConnection().getRepository(Item);
      const queryResult = await repo
        .createQueryBuilder("item")
        .innerJoinAndSelect("item.owner", "owner")
        .where("owner.id = :id", { id: userId })
        .getManyAndCount();

      return {
        count: queryResult[1],
        items: queryResult[0]
      };
    } catch (err) {
      throw err;
    }
  }
}
