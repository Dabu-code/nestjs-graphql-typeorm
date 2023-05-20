import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { postSchema } from '../../schema/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { postService } from '../service/post.service';
import { createPostDto } from '../../dto/post-create.dto';

//import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class postResolver {
    //private pubSub: PubSub;

    constructor(private readonly post_service: postService) {
       // this.pubSub = new PubSub();
    }

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
            const created: postSchema = await this.post_service.create(value);
            console.log(created)
            //this.pubSub.publish("post_event", { post_event: created })
            return created;

        } catch (e: any) {
            throw new InternalServerErrorException(e.message);
        }
    }

    /*@Mutation(() => postSchema)
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
    }*/

    /*@Subscription(() => postSchema)
    public post_event(): AsyncIterator<postSchema> {
        return this.pubSub.asyncIterator<postSchema>("post_event")
    }*/
}