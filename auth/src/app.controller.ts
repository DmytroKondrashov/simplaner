import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('authenticate_user')
  async authenticateUser(payload: any) {
    return this.appService.authenticateUser(payload);
  }
}
