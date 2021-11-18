import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("items")
export class Item extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: "varchar", length: 500 })
  picture: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 200 })
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.auctionsOwned, { onDelete: "CASCADE" })
  owner: User;

  @Column({ type: "boolean", default: false })
  participating: boolean;
}
