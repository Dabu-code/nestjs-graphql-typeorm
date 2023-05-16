import { postEntityInterface } from "./post.entity";
import { commentTypeInterface } from "./types/comment.type";
import { v4 as uuid } from 'uuid'
export class postValue implements postEntityInterface {
    uuid?: string;
    author: string;
    title: string;
    content: string;
    comments: commentTypeInterface[];

    constructor(post: postEntityInterface) {
        this.uuid = post.uuid ?? uuid();
        this.author = post.author;
        this.title = post.title;
        this.content = post.content;
        this.comments = post.comments.map(item => {
            return {
                ...item,
                uuid: item.uuid ?? uuid()
            }
        })
    }

}