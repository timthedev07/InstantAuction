import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class GoogleUser {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  verified_email: boolean;

  @Field()
  name: string;

  @Field()
  given_name: string;

  @Field()
  family_name: string;

  @Field(() => String, { nullable: true })
  picture: string | null;

  @Field()
  locale: string;

  @Field(() => String, { nullable: true })
  hd: string | null;
}
