/*import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Field, ObjectType } from "@nestjs/graphql";
import { postModel } from "../post.model";

@Entity({name:'commentdb',})
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
}*/


import { Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';
import { postModel } from './post.model';

export type postDocument = HydratedDocument<commentModel>;

@Schema({ collection: 'comments' })
export class commentModel {

    @Prop()
    @Field(() => ID, { nullable: true })
    _id?: string;

    @Prop()
    @Field()
    uuid?: string;

    @Prop()
    @Field()
    author: string;

    @Prop()
    @Field()
    content: string;
}

export const commentSchema = SchemaFactory.createForClass(commentModel);