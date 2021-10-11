import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class DiscordUser {
  @Field(() => String, { nullable: true })
  accent_color: string | null | undefined;
  @Field(() => String, { nullable: true })
  avatar: string | null | undefined;
  @Field(() => String, { nullable: true })
  banner: string | null | undefined;
  @Field(() => String, { nullable: true })
  banner_color: string | null | undefined;
  @Field()
  discriminator: string;
  @Field(() => String, { nullable: true })
  email: string | null | undefined;
  @Field()
  flags: number;
  @Field()
  id: string;
  @Field()
  locale: string;
  @Field()
  mfa_enabled: boolean;
  @Field()
  public_flags: number;
  @Field()
  username: string;
  @Field()
  verified: boolean;
}
