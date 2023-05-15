import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class commentSchema{
    @Field({nullable: true})
    uuid?:string;
    @Field()
    author:string;
    @Field()
    content:string;
}