import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('list.findAll')
  async findAll(token: string) {
    return this.appService.findAll(token);
  }

  @MessagePattern('list.create')
  async create(body: CreateListDto) {
    return this.appService.create(body);
  }

  @MessagePattern('list.update')
  async update(body: UpdateListDto) {
    return this.appService.update(body);
  }

  @MessagePattern('list.delete')
  async delete(id: string, token: string) {
    return this.appService.delete(id, token);
  }
}
