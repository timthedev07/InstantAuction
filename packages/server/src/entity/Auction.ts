import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Bid } from "./Bid";
import { User } from "./User";

@ObjectType()
@Entity("auctions")
export class Auction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: "varchar", length: 100 })
  title: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 400 })
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.auctionsOwned)
  seller: User;

  @Field(() => Date)
  @Column({ type: "timestamptz", default: new Date() })
  dateCreated: Date;

  @Field(() => Date)
  @Column({ type: "timestamptz", default: new Date() })
  dateUpdated: Date;

  @Field(() => [Bid])
  @OneToMany(() => Bid, bid => bid.item)
  bids: Bid[];
}
