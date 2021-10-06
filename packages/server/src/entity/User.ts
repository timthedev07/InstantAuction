import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
} from "typeorm";

@ObjectType()
@Unique(["email"]) // here we are forcing an unique constraint on the email
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("bigint", { default: new Date().valueOf() })
  memberSince: number;
}
