import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Column
} from "typeorm";
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
  @ManyToOne(() => Auction, auction => auction.bids, { onDelete: "CASCADE" })
  auction: Auction;

  @Field(() => User)
  @ManyToOne(() => User, user => user.bids, { onDelete: "CASCADE" })
  bidder: User;

  @Field(() => Item)
  @OneToOne(() => Item, { onDelete: "CASCADE" })
  @JoinColumn()
  item: Item;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  won: boolean;
}
