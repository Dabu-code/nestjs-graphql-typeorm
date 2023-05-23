import { Injectable } from "@nestjs/common";
import { typeormRepository } from "../../repository/typeorm.repository";
import { postSchema } from "../../schema/post.schema";
import { createPostDto } from "../../dto/create-post.dto";
import { updatePostDto } from "../../dto/update-post.dto";
import { postApplication } from "src/modules/pub/application/post.application";

@Injectable()
export class postService {
    private post_application: postApplication;

    constructor(private readonly typeorm_repository: typeormRepository) {
        this.post_application = new postApplication(typeorm_repository);
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

    public update(post: updatePostDto): Promise<postSchema> {
        return this.post_application.process.update(post);
    }


    public delete(uuid: string): Promise<postSchema> {
        return this.post_application.process.delete(uuid);
    }


}