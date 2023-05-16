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


    public async show(): Promise<postEntityInterface[]> {
        try {
            const listed: postModel[] = await this.post_repository.find();
            if (!listed) return undefined;
            listed.map<postEntityInterface>(item => postTypeOrmUtils.get_post(item));
            return listed;
        } catch (error) {
            throw error;
        }
    }

    public async get(uuid: string): Promise<postEntityInterface> {
        try {
            const geted: postModel = await this.post_repository.findOneBy({ uuid });
            if (!geted) return undefined;
            return postTypeOrmUtils.get_post(geted);
        } catch (error) {
            throw error;
        }
    }

    public async create(post: postEntityInterface): Promise<postEntityInterface> {
        try {
            const new_data: postModel = this.post_repository.create(post);
            if (!new_data) return undefined;
            const created: postModel = await this.post_repository.save(new_data);
            return postTypeOrmUtils.get_post(created);
        } catch (e: any) {
            throw e;
        }
    }

    public async update(post: postEntityInterface): Promise<postEntityInterface> {
        try {
            const update_data: postModel = await this.post_repository.findOneBy({ uuid: post.uuid });
            if (!update_data) return undefined;
            //const updated: postModel = await this.post_repository.save(Object.assign(update_data, post));
            //return postTypeOrmUtils.get_post(updated);
            return postTypeOrmUtils.get_post(update_data);
        } catch (e: any) {
            throw e;
        }
    }

    public async delete(uuid: string): Promise<postEntityInterface> {
        try {
            const deleted: postModel = await this.post_repository.findOneBy({ uuid });
            await this.post_repository.delete(uuid);
            return postTypeOrmUtils.get_post(deleted);
        } catch (e: any) {
            return e;
        }
    }

    public async show_comment(uuid_post: string): Promise<commentTypeInterface[]> {
        try {
            const listed: commentModel[] = await this.comment_repository.findBy({ post: { uuid: uuid_post } });
            if (!listed) return undefined;
            return listed.map<commentModel>(item => postTypeOrmUtils.get_comment(item));
        } catch (e: any) {
            throw e;
        }
    }

    public async get_comment(uuid: string): Promise<commentTypeInterface> {
        try {
            const geted: commentModel = await this.comment_repository.findOneBy({ uuid });
            if (!geted) return undefined;
            return postTypeOrmUtils.get_comment(geted);
        } catch (error) {
            throw error;
        }
    }

    public async create_comment(uuid_post: string, comment: commentTypeInterface): Promise<commentTypeInterface> {
        try {
            const new_data: commentModel = this.comment_repository.create({
                ...comment,
                post: { uuid: uuid_post }
            });
            const created: commentModel = await this.comment_repository.save(new_data);
            return postTypeOrmUtils.get_comment(created);
        } catch (e: any) {
            throw e;
        }
    }

    public async update_comment( comment: commentTypeInterface): Promise<commentTypeInterface> {
        try {
            const update_data: commentModel = await this.comment_repository.findOneBy({ uuid: comment.uuid });
            if (!update_data) return undefined;
            const updated: commentModel = await this.comment_repository.save(Object.assign(update_data, comment));
            return postTypeOrmUtils.get_comment(updated);
        } catch (e: any) {
            throw e;
        }
    }


    public async delete_comment(uuid: string): Promise<commentTypeInterface> {
        try {
            const deleted: commentModel = await this.comment_repository.findOneBy({ uuid });
            await this.comment_repository.delete(uuid);
            return postTypeOrmUtils.get_comment(deleted);
        } catch (e: any) {
            return e;
        }
    }



}