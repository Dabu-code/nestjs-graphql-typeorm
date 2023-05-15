import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { postSchema } from '../../schema/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { createPostDto } from '../../dto/create-post.dto';
import { postService } from '../service/post.service';

@Resolver()
export class postResolver {

    constructor(private readonly post_service: postService) { }

    @Query(() => postSchema)
    public async post(@Args("uuid_post") uuid: string): Promise<postSchema> {
        try {
            return await this.post_service.get(uuid);
        } catch (e: any) {
            throw new InternalServerErrorException(e.message);
        }
    }

    @Query(() => [postSchema])
    public async posts(): Promise<postSchema[]> {
        try {
            return await this.post_service.show();
        } catch (e: any) {
            throw new InternalServerErrorException(e.message);
        }
    }

    @Mutation(() => postSchema)
    public async create_post(@Args("post_input") post_input: createPostDto): Promise<postSchema> {
        try {
            return await this.post_service.create(post_input);
        } catch (e: any) {
            throw new InternalServerErrorException(e.message);
        }
    }
}