import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './modules/posts/infrastructure/resource/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
    
    PostModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/global/graphql/schema.gql'),
      playground: true,
      sortSchema: true,
      installSubscriptionHandlers: true,
    }),
    
  ],
 // controllers: [AppController],
 // providers: [AppService],
})
export class AppModule { }
