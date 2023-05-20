import { postEntityInterface } from "src/modules/posts/domain/post.entity";
import { postModel } from "../../model/post.model";
import { commentModel } from "../../model/comment.model";
import { commentTypeInterface } from "src/modules/posts/domain/types/comment.type";

export class postRepositoryUtils {
  

    public static get_post(model: postModel): postEntityInterface {
        return {
            uuid: model._id,
            author: model.author,
            title: model.title,
            content: model.content,
            comments:[]
        }
    }

    public static get_comment(model: commentModel): commentTypeInterface{
        return {
            uuid: model._id,
            
            author: model.author,
            content: model.content,
        }
    }

    public static create_data(model: postModel ){
        return {
            _id: model._id,
            author: model.author,
            title: model.title,
            content: model.content,
            comments:[]
        }
        
    }

  

}