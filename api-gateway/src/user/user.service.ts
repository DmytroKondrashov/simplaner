import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    ['user.create', 'user.findAll', 'user.findOne', 'user.delete'].forEach(
      (key) => this.client.subscribeToResponseOf(key),
    );
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async createUser(body: CreateUserDto) {
    const response$ = this.client.send('user.create', body);
    const response = await firstValueFrom(response$);
    return response;
  }

  async findAll() {
    return this.client.send('user.findAll', {});
  }

  async findOne(id: string) {
    const response$ = this.client.send('user.findOne', { id });
    const response = await firstValueFrom(response$);
    return response;
  }

  async deleteUser(id: string) {
    const response$ = this.client.send('user.delete', { id });
    const response = await firstValueFrom(response$);
    return response;
  }
}
