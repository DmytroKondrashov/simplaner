import { Controller, Inject, UseGuards } from '@nestjs/common';
import {
  ClientKafka,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { UserService } from './user.service';
import UserUniquenessGuard from 'src/guards/user-uniqueness.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject('API_GATEWAY_SERVICE') private readonly client: ClientKafka,
    private readonly userService: UserService,
  ) {}

  @UseGuards(UserUniquenessGuard)
  @MessagePattern('user.create')
  async handleUserCreationInitiated(@Payload() data: any) {
    return this.userService.create(data);
  }

  @MessagePattern('user.findAll')
  async handleUserFindAll() {
    return this.userService.findAll();
  }

  @MessagePattern('user.findOne')
  async handleUserFindOne(@Payload() data: any) {
    return this.userService.findOne({ id: Number(data.id) });
  }

  @MessagePattern('user.delete')
  async handleUserDelete(@Payload() data: any) {
    return this.userService.deleteUser(Number(data.id));
  }

  @MessagePattern('user.login')
  async handleUserLogin(@Payload() data: any) {
    const user = await this.userService.validateUser(data.email, data.password);
    if (!user) {
      throw new RpcException({
        statusCode: 401,
        message: 'Invalid credentials',
      });
    }
    return this.userService.login(user);
  }
}
