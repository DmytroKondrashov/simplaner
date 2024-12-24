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
    await this.userService.create(data);
  }
}
