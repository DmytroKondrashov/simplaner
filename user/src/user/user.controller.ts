import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject('API_GATEWAY_SERVICE') private readonly client: ClientKafka,
    private readonly userService: UserService,
  ) {}

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
}
