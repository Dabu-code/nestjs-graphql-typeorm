import { InjectModel } from "@nestjs/mongoose";
import { postEntityInterface } from "../../domain/post.entity";
import { postModel } from "../model/post.model";
import { postRepositoryUtils } from "./utils/post.utils";
import { Model } from "mongoose";
import { postRepositoryInterface } from "../../domain/post.repository";
import { commentTypeInterface } from "../../domain/types/comment.type";
import { commentModel } from "../model/comment.model";

export class mongooseRepository implements postRepositoryInterface {

    constructor(
        @InjectModel(postModel.name) private post_repository: Model<postModel>,
        @InjectModel(commentModel.name) private comment_repository: Model<commentModel>
    ) { }


    public async show(): Promise<postEntityInterface[]> {
        try {
            const listed = await this.post_repository.find().exec();
            if (!listed) return undefined;
            return listed.map<postEntityInterface>(item => postRepositoryUtils.get_post(item));
        } catch (error) {
            throw error;
        }
    }

    public async get(uuid: string): Promise<postEntityInterface> {
        try {

            const geted = await this.post_repository.findOne({ uuid });
            if (!geted) return undefined;
            return postRepositoryUtils.get_post(geted);
        } catch (error) {
            throw error;
        }
    }

    public async create(post: postEntityInterface): Promise<postEntityInterface> {
        console.log('CREATE')
        console.log(post)

        try {
            const _id = post.uuid;
            delete post.uuid;
            const new_data = new this.post_repository({ ...post, _id });
            if (!new_data) return undefined;
            const created: postModel = await new_data.save();
            return postRepositoryUtils.get_post(created);
        } catch (e: any) {
            throw e;
        }
    }


    public async update(post: postEntityInterface): Promise<postEntityInterface> {
        try {
            const update_data: postModel = await this.post_repository.findOne({ uuid: post.uuid });
            if (!update_data) return undefined;
            //const updated: postModel = await this.post_repository.save(Object.assign(update_data, post));
            //return postRepositoryUtils.get_post(updated);
            return postRepositoryUtils.get_post(update_data);
        } catch (e: any) {
            throw e;
        }
    }

    public async delete(uuid: string): Promise<postEntityInterface> {
        try {
            const deleted: postModel = await this.post_repository.findOne({ uuid });
            // await this.post_repository.deleteOne(uuid);
            return postRepositoryUtils.get_post(deleted);
        } catch (e: any) {
            return e;
        }
    }

    public async show_comment(uuid_post: string): Promise<commentTypeInterface[]> {
        try {
            const listed: commentModel[] = await this.comment_repository.findOne({ post: { uuid: uuid_post } });
            if (!listed) return undefined;
            return listed//.map<commentModel>(item => postRepositoryUtils.get_comment(item));
        } catch (e: any) {
            throw e;
        }
    }

    public async get_comment(uuid: string): Promise<commentTypeInterface> {
        try {
            const geted: commentModel = await this.comment_repository.findOne({ uuid });
            if (!geted) return undefined;
            return postRepositoryUtils.get_comment(geted);
        } catch (error) {
            throw error;
        }
    }

    public async create_comment(uuid_post: string, comment: commentTypeInterface): Promise<commentTypeInterface> {
        console.log('Comment_______________')
        console.log(uuid_post);
        console.log(comment)
        try {
            const _id = comment.uuid;
            delete comment.uuid;
            const new_data = new this.comment_repository({
                ...comment,
                post: { _id: uuid_post },
                _id
            });
            const created: commentModel = await new_data.save();
            console.log(created)
            console.log('____________________________________')
            return postRepositoryUtils.get_comment(created);
        } catch (e: any) {
            throw e;
        }
    }

    public async update_comment(comment: commentTypeInterface): Promise<commentTypeInterface> {
        try {
            const update_data = new this.comment_repository(comment);
            if (!update_data) return undefined;
            const updated: commentModel = await update_data.updateOne();
            return postRepositoryUtils.get_comment(updated);
        } catch (e: any) {
            throw e;
        }
    }


    public async delete_comment(uuid: string): Promise<commentTypeInterface> {
        try {
            const deleted: commentModel = await this.comment_repository.findOne({ uuid });
            await this.comment_repository.deleteOne({ _id: uuid });
            return postRepositoryUtils.get_comment(deleted);
        } catch (e: any) {
            return e;
        }
    }





}