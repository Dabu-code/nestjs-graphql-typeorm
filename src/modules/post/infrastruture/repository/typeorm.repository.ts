import { InjectRepository } from "@nestjs/typeorm";
import { postEntityInterface } from "src/modules/post/domain/post.entity";
import { postRepositoryInterface } from "src/modules/post/domain/post.repository";
import { commentTypeInterface } from "src/modules/post/domain/types/comment.type";
import { postModel } from "../model/post.model";
import { Repository } from "typeorm";
import { commentModel } from "../model/types/comment.model";
import { postTypeOrmUtils } from "./utils/post.utils";

export class typeormRepository implements postRepositoryInterface {

    constructor(
        @InjectRepository(postModel) private readonly post_repository: Repository<postModel>,
        @InjectRepository(commentModel) private readonly comment_repository: Repository<commentModel>,
    ) { }


    async show(): Promise<postEntityInterface[]> {
        try {
            const listed: postModel[] = await this.post_repository.find();
            if (!listed) return undefined;
            listed.map<postEntityInterface>(item => postTypeOrmUtils.get_post(item));
            return listed;
        } catch (error) {
            throw error;
        }
    }


    async get(uuid: string): Promise<postEntityInterface> {
        try {
            const geted: postModel = await this.post_repository.findOneBy({ uuid });
            if (!geted) return undefined;
            return postTypeOrmUtils.get_post(geted);
        } catch (error) {
            throw error;
        }
    }

    async create(post: postEntityInterface): Promise<postEntityInterface> {
        try {
            const new_data: postModel = this.post_repository.create(post);
            const created: postModel = await this.post_repository.save(new_data);
            return postTypeOrmUtils.get_post(created);
        } catch (e: any) {
            throw e;
        }
    }
    update(post: postEntityInterface): Promise<postEntityInterface> {
        /*try {
            const update_data: postModel = this.post_repository.update(post);
            const updated: postModel = await this.post_repository.save(update_data);
            return postTypeOrmUtils.get_post(updated);
        } catch (e: any) {
            throw e;
        }*/
        throw new Error("Method not implemented.");
    }
    delete(uuid: string): Promise<postEntityInterface> {
        throw new Error("Method not implemented.");
    }

    async show_comment(uuid_post: string): Promise<commentTypeInterface[]> {
        try {
            const listed: commentModel[] = await this.comment_repository.findBy({ uuid: uuid_post });
            if (!listed) return undefined;
            return listed.map<commentModel>(item => postTypeOrmUtils.get_comment(item));
        } catch (e: any) {
            throw e;
        }
    }

    async get_comment(uuid_post: string, uuid: string): Promise<commentTypeInterface> {
        try {
            const geted: commentModel = await this.comment_repository.findOneBy({ uuid: uuid_post });
            if (!geted) return undefined;
            return postTypeOrmUtils.get_comment(geted);
        } catch (error) {
            throw error;
        }
    }

    async create_comment(uuid_post: string, comment: commentTypeInterface): Promise<commentTypeInterface> {
        try {
            const new_data: commentModel = this.comment_repository.create({
                ...comment,
                uuid: uuid_post
            });
            const created: commentModel = await this.comment_repository.save(new_data);
            return postTypeOrmUtils.get_comment(created);
        } catch (e: any) {
            throw e;
        }
    }
    update_comment(uuid_post: string, comment: commentTypeInterface): Promise<commentTypeInterface> {
        throw new Error("Method not implemented.");
    }
    delete_comment(uuid_post: string, uuid: string): Promise<commentTypeInterface> {
        throw new Error("Method not implemented.");
    }

}