import { Field, InputType } from "@nestjs/graphql";
import { createCommentDto } from "./comment-create.dto";


@InputType()
export class createPostDto{
    @Field({nullable: true})
    _id?:string;
    @Field({nullable: true})
    uuid?:string;
    
    @Field()
    title:string;
    @Field()
    author:string;
    @Field()
    content:string;
    
    @Field(()=>[createCommentDto])
    comments:createCommentDto[]; 
}