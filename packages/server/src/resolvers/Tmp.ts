import { Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

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
}
