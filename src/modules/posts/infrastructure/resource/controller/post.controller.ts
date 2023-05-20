import { Controller } from '@nestjs/common';
import { postSchema } from '../../schema/post.schema';
import { postService } from '../service/post.service';


@Controller()
export class postController {
    constructor(private readonly post_service: postService) {}

    //@GrpcMethod("PostService","Find")
    public async find():Promise<{posts:postSchema[]}>{
        return {
            posts: await this.post_service.show()
        }
    }
    


}