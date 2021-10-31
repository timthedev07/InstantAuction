import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Auction } from "./Auction";
import { Item } from "./Item";
import { User } from "./User";

@ObjectType()
@Entity("bids")
export class Bid extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Auction)
  @ManyToOne(() => Auction, item => item.bids)
  auction: Auction;

  @Field(() => User)
  @ManyToOne(() => User, user => user.bids)
  bidder: User;

  @Field(() => Item)
  item: Item;
}