import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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
  @Column({ type: "varchar", length: "35", unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  provider: string | null;

  @Field(() => String)
  @Column("text")
  avatarUrl: string;
}
