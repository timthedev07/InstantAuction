import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Resolver, Mutation, Arg, UseMiddleware, Ctx, Int } from "type-graphql";
import { unauthorizedErrorMessage } from "../../constants/errorMessages";
import { Item } from "../../entity/Item";
import { NetworkingContext } from "../../types/NetworkingContext";
import { handleImageUpload } from "../../utils/handleImageUpload";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class ModifyItemResolver {
  @Mutation(() => Item)
  @UseMiddleware(isAuth)
  async modifyItem(
    @Ctx() { req }: NetworkingContext,
    @Arg("itemId", () => Int) itemId: number,
    @Arg("newName", { nullable: true }) newName?: string,
    @Arg("picture", () => GraphQLUpload, { nullable: true })
    fileUpload?: FileUpload
  ): Promise<Item> {
    const item = await Item.findOne({
      where: { id: itemId },
      relations: ["owner"]
    });

    if (!item) {
      throw new Error("Invalid item");
    }

    if (item.owner.id !== req.session.userId) {
      throw new Error(unauthorizedErrorMessage);
    }

    try {
      await Item.getRepository().save({
        id: itemId,
        name: newName,
        picture: fileUpload ? await handleImageUpload(fileUpload) : undefined
      });

      return await Item.findOne(itemId);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to update your item.");
    }
  }
}
