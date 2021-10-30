import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Auction } from "./Auction";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: "text", unique: true })
  email: string;

  @Field(() => String)
  @Column({ type: "varchar", length: "45", unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  provider: string | null;

  @Field(() => String)
  @Column("text")
  avatarUrl: string;

  @Field(() => Int)
  @Column({ type: "integer", default: 0 })
  transactionCount: number;

  @Field(() => Int)
  @Column({ type: "integer", default: 100 })
  reputation: number;

  @Column({ type: "text", nullable: false })
  externalId: string;

  @Field(() => [Auction])
  @OneToMany(() => Auction, (item) => item.seller)
  auctionsOwned: Auction[];

  @Field(() => [Auction])
  @OneToMany(() => Auction, (item) => item)
  itemsBid: Auction[];
}
