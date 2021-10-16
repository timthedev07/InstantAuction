import { Ctx, Mutation, Resolver } from "type-graphql";
import { sessionCookieName } from "../../constants/session";
import { NetworkingContext } from "../../types/NetworkingContext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: NetworkingContext) {
    return new Promise<boolean>((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(sessionCookieName);
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
