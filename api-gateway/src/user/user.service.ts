import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    [
      'user.create',
      'user.findAll',
      'user.findOne',
      'user.delete',
      'user.login',
    ].forEach((key) => this.client.subscribeToResponseOf(key));
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async createUser(body: CreateUserDto) {
    const response$ = this.client.send('user.create', body);
    const response = await firstValueFrom(response$);
    return response;
  }

  async findAll(token: string) {
    return this.client.send('user.findAll', {
      token,
    });
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

  async login(body: LoginDto) {
    const user$ = await this.client.send('user.findOne', {
      email: body.email,
    });
    const user = await firstValueFrom(user$);
    const response$ = this.client.send('user.login', {
      email: user.email,
      password: body.password,
    });
    const response = await firstValueFrom(response$);
    return response;
  }
}
