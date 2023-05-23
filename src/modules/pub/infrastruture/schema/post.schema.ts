import { Field, ObjectType } from "@nestjs/graphql";
import { commentSchema } from "./comment.schema";

@ObjectType()
export class postSchema{
    @Field({nullable: true})
    uuid?:string;
    @Field()
    author:string;
    @Field()
    title:string;
    @Field()
    content:string;
    @Field(()=>[commentSchema])
    comments:commentSchema[];
}