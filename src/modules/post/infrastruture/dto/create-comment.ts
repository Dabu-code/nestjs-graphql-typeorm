import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createCommentDto{
    @Field()
    author:string;
    @Field()
    content:string;
}