import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport:Transport.GRPC,
    options:{
      url:'0.0.0.0:50051',
      package:"post",
      protoPath: join(process.cwd(),"src/modules/post/infrastruture/proto/post.proto")
    }
  })
  await app.listen(3000);
}
bootstrap();
