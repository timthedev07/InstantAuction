import { Resolver, Mutation, UseMiddleware, Arg, Int, Ctx } from "type-graphql";
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
    try {
      const item = await Item.findOne({
        where: {
          id: itemId
        },
        relations: ["owner"]
      });

      if (item.owner.id !== req.session.userId) {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      throw new Error("Invalid item");
    }

    try {
      await Item.delete({ id: itemId });
      return true;
    } catch (err) {
      return false;
    }
  }
}
