import { Resolver, Mutation, Arg, Int, Ctx, UseMiddleware } from "type-graphql";
import { Item } from "../../entity/Item";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class DeleteItemResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteItem(
    @Arg("itemId", () => Int) itemId: number,
    @Ctx() { req }: NetworkingContext
  ): Promise<boolean> {
    let item;
    try {
      item = await Item.findOne({
        where: {
          id: itemId
        },
        relations: ["owner"]
      });
    } catch (err) {
      console.log(err);
      throw new Error("Invalid item");
    }
    if (item.owner.id !== req.session.userId) {
      throw new Error("Unauthorized");
    }

    try {
      await Item.delete({ id: itemId });
      return true;
    } catch (err) {
      return false;
    }
  }
}
