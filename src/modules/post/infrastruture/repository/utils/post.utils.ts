import { postEntityInterface } from "src/modules/post/domain/post.entity";
import { postModel } from "../../model/post.model";
import { commentModel } from "../../model/types/comment.model";
import { commentTypeInterface } from "src/modules/post/domain/types/comment.type";

export class postTypeOrmUtils {


    public static get_post(model: postModel): postEntityInterface {
        return {
            uuid: model.uuid,
            author: model.author,
            title: model.title,
            content: model.content,
            comments: []
        }
    }

    public static get_comment(model: commentModel): commentTypeInterface{
        return {
            uuid: model.uuid,
            author: model.author,
            content: model.content,
        }
    }

}
