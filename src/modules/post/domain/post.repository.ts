import { postEntityInterface } from "./post.entity";
import { commentTypeInterface } from "./types/comment.type";

export interface postRepositoryInterface {

    //POST
    show(): Promise<postEntityInterface[]>;
    get(uuid: string): Promise<postEntityInterface>;
    create(post: postEntityInterface): Promise<postEntityInterface>;
    update(post: postEntityInterface): Promise<postEntityInterface>;
    delete(uuid: string): Promise<postEntityInterface>;

    //COMMENT
    show_comment(uuid_post: string): Promise<commentTypeInterface[]>;
    get_comment(uuid_post: string, uuid: string): Promise<commentTypeInterface>;
    create_comment(uuid_post: string, comment: commentTypeInterface): Promise<commentTypeInterface>;
    update_comment(uuid_post: string, comment: commentTypeInterface): Promise<commentTypeInterface>;
    delete_comment(uuid_post: string, uuid: string): Promise<commentTypeInterface>;
}