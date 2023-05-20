import { commentTypeInterface } from "./types/comment.type";

export interface postEntityInterface {
    uuid?: string;
    author: string;
    title: string;
    content: string;
    comments: commentTypeInterface[];
}