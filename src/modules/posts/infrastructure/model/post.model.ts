
import { Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { commentModel } from './comment.model';

export type postDocument = HydratedDocument<postModel>;

@Schema({ collection: 'posts' })
export class postModel {

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
    title: string;

    @Prop()
    @Field()
    content: string;

    @Prop()
    @Field(() => [commentModel])
    comments: commentModel[];
}

export const postSchema = SchemaFactory.createForClass(postModel);