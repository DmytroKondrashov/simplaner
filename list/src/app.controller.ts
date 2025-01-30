import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateListDto } from './dtos/create.list.dto';
import { UpdateListDto } from './dtos/update.list.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('list.findAll')
  async findAll(token: string) {
    return this.appService.findAll(token);
  }

  @MessagePattern('list.create')
  async create(body: CreateListDto, token: string) {
    return this.appService.create(body, token);
  }

  @MessagePattern('list.update')
  async update(body: UpdateListDto, token: string) {
    return this.appService.update(body, token);
  }

  @MessagePattern('list.delete')
  async delete(id: string, token: string) {
    return this.appService.delete(id, token);
  }
}
