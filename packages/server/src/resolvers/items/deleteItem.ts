import { Resolver, Mutation, UseMiddleware, Arg, Int } from "type-graphql";
import { Item } from "../../entity/Item";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class DeleteItemResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteItem(@Arg("itemId", () => Int) itemId: number): Promise<boolean> {
    try {
      await Item.delete({ id: itemId });
      return true;
    } catch (err) {
      return false;
    }
  }
}
