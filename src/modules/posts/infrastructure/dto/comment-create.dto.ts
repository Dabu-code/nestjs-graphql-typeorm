import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createCommentDto{
    @Field({nullable: true})
    uuid?:string;
    @Field()
    author:string;
    @Field()
    content:string;
}