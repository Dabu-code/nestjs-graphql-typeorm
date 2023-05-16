import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { postSchema } from '../../schema/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { createPostDto } from '../../dto/create-post.dto';
import { postService } from '../service/post.service';
import { updatePostDto } from '../../dto/update-post.dto';

@Resolver()
export class postResolver {

    constructor(private readonly post_service: postService) { }

    @Query(() => postSchema)
    public async post(@Args("uuid") uuid: string): Promise<postSchema> {
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
    public async create_post(@Args("create_post") value: createPostDto): Promise<postSchema> {
        try {
            return await this.post_service.create(value);
        } catch (e: any) {
            throw new InternalServerErrorException(e.message);
        }
    }

    @Mutation(() => postSchema)
    public async update_post(@Args("update_post") value: updatePostDto): Promise<postSchema> {
        try {
            return await this.post_service.update(value);
        } catch (e: any) {
            console.log(e)
            throw new InternalServerErrorException(e.message);
        }
    }

    @Mutation(() => postSchema)
    public async delete_post(@Args("delete_post") uuid: string): Promise<postSchema> {
        try {
            return await this.post_service.delete(uuid);
        } catch (e: any) {
            throw new InternalServerErrorException(e.message);
        }
    }
}