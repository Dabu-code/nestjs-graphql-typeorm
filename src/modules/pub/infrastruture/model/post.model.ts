import { Field } from "@nestjs/graphql";
import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany, PrimaryColumn, } from "typeorm";
import { commentModel } from "./types/comment.model";

@Entity({ name: 'posts',  })
export class postModel {
  @ObjectIdColumn()
 /* id: ObjectId;

  @PrimaryColumn({ type: 'varchar', length: 100 })
  @Field({ nullable: true })*/
  uuid?: string;

  @PrimaryColumn({ type: 'varchar', length: 100 })
  @Field({ nullable: true })
  _id?: string;

  @OneToMany(() => commentModel, (comment) => comment.post)
  @Field(() => [commentModel])
  comments: commentModel[];

  @Column({ type: 'varchar', length: 100 })
  @Field()
  author: string;

  @Column({ type: 'varchar', length: 100 })
  @Field()
  title: string;

  @Column({ type: 'text' })
  @Field()
  content: string;





}