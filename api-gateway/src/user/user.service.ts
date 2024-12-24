import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    ['user.create', 'user.findAll'].forEach((key) =>
      this.client.subscribeToResponseOf(key),
    );
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async createUser(body: CreateUserDto) {
    return this.client.send('user.create', body);
  }

  async findAll() {
    return this.client.send('user.findAll', {});
  }
}
