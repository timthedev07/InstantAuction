import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Auction } from "./Auction";
import { User } from "./User";

@ObjectType()
@Entity("bids")
export class Bid extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @ManyToOne(() => Auction, item => item.bids)
  item: Auction;

  @Field(() => User)
  @ManyToOne(() => User, user => user.itemsBid)
  bidder: User;
}
