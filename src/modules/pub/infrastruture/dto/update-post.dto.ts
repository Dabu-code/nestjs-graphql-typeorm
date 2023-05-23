import { Field, InputType } from "@nestjs/graphql";
import { createCommentDto } from "./create-comment";

@InputType()
export class updatePostDto{
    @Field()
    uuid:string;
    @Field()
    title:string;
    @Field()
    author:string;
    @Field()
    content:string;
    @Field(()=>[createCommentDto])
    comments:createCommentDto[];
}