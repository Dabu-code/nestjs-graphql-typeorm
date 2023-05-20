import { Module } from '@nestjs/common';
import { postController } from './controller/post.controller';
import { postService } from './service/post.service';
import { postResolver } from './resolver/post.resolver';
import { mongooseRepository } from '../repository/mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { postModel, postSchema } from '../model/post.model';
import { commentModel, commentSchema } from '../model/comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: postModel.name, schema: postSchema },
      { name: commentModel.name, schema: commentSchema },
    ])
  ],
  providers: [mongooseRepository,postService, postResolver],
  controllers: [postController]
})
export class PostModule {}