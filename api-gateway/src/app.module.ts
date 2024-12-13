import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PublisherService } from './publisher/publisher.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, PublisherService],
})
export class AppModule {}
