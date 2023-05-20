import { Field, ObjectType } from "@nestjs/graphql";
import { postSchema } from "./post.schema";

@ObjectType()
export class commentSchema{
    @Field({nullable: true})
    uuid?:string;
    @Field()
    author:string;
    @Field()
    content:string;
    @Field(()=>[postSchema])
    post?:postSchema[];
}