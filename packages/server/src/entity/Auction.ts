import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Bid } from "./Bid";
import { Item } from "./Item";
import { User } from "./User";

@ObjectType()
@Entity("auctions")
export class Auction extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 100 })
  title: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 400 })
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.auctionsOwned, { onDelete: "CASCADE" })
  seller: User;

  @Field(() => Date)
  @Column({ type: "timestamptz", default: new Date() })
  dateCreated: Date;

  @Field(() => Date)
  @Column({ type: "timestamptz", default: new Date() })
  dateUpdated: Date;

  @Field(() => [Bid])
  @OneToMany(() => Bid, bid => bid.auction)
  bids: Bid[];

  @Field(() => String)
  @Column({ type: "varchar", length: 6, default: "open" })
  status: "closed" | "open";

  @Field(() => Item)
  @OneToOne(() => Item, { onDelete: "CASCADE", nullable: false })
  @JoinColumn()
  item: Item;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.auctionsWon, {
    onDelete: "SET NULL",
    nullable: true,
  })
  winner: User | null;
}
