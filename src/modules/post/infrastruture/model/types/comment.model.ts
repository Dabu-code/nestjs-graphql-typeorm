import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Field, ObjectType } from "@nestjs/graphql";
import { postModel } from "../post.model";

@Entity()
@ObjectType()
export class commentModel{
    @PrimaryColumn({type: "varchar", length: 100})
    @Field({nullable: true})
    uuid?:string;

    @ManyToOne(()=>postModel,(post)=>post.comments)
    @Field(()=>postModel,{nullable: true})
    post?:postModel;

    @Column({type: "varchar", length: 100})
    @Field()
    author:string;

    @Column({type: "text"})
    @Field()
    content:string;
}