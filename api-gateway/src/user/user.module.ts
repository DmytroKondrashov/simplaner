import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PublisherService } from 'src/publisher/publisher.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PublisherService],
})
export class UserModule {}
