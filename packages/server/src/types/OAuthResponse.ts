import { ObjectType, Field } from "type-graphql";
import { User } from "../entity/User";

@ObjectType()
export class OAuthResponse {
  @Field(() => User, { nullable: true })
  user: User | null;
}
