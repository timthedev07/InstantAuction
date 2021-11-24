import { Auction } from "../entity/Auction";
import { Field, InputType } from "type-graphql";

@InputType()
export class ModifyAuctionPartialUpdate implements Partial<Auction> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
