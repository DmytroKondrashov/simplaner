import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject('API_GATEWAY_SERVICE') private readonly client: ClientKafka,
    private readonly userService: UserService,
  ) {}

  @EventPattern('user.creation.initiated')
  async handleUserCreationInitiated(@Payload() data: any) {
    await this.userService.create(data);
  }
}
