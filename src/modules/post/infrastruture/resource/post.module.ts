import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postModel } from '../model/post.model';
import { commentModel } from '../model/types/comment.model';
import { typeormRepository } from '../repository/typeorm.repository';
import { postService } from './service/post.service';
import { postResolver } from './resolver/post.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([postModel,commentModel])
  ],
  providers: [typeormRepository,postService, postResolver]
})
export class PostModule {}