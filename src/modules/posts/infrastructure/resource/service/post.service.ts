import { Injectable } from "@nestjs/common";

import { postSchema } from "../../schema/post.schema";
import { postApplication } from "src/modules/posts/application/post.application";
import { mongooseRepository } from "../../repository/mongo.repository";
import { createPostDto } from "../../dto/post-create.dto";


@Injectable()
export class postService {
    private post_application: postApplication;

    constructor(private readonly mongoose_repository: mongooseRepository) {
        this.post_application = new postApplication(mongoose_repository);
    }

    public async get(uuid: string): Promise<postSchema> {
        return await this.post_application.show.get(uuid);
    }

    public show(): Promise<postSchema[]> {
        return this.post_application.show.show();
    }

    public create(post: createPostDto): Promise<postSchema> {
        return this.post_application.process.create(post);
    }

   /* public update(post: updatePostDto): Promise<postSchema> {
        return this.post_application.process.update(post);
    }


    public delete(uuid: string): Promise<postSchema> {
        return this.post_application.process.delete(uuid);
    }*/


}