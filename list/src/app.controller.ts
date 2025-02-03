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
  async create(payload: CreateListDto) {
    return this.appService.create(payload);
  }

  @MessagePattern('list.update')
  async update(payload: UpdateListDto) {
    return this.appService.update(payload);
  }

  @MessagePattern('list.addItem')
  async addItem(payload: any) {
    console.log(payload);
    // return this.appService.addItem(payload);
  }

  @MessagePattern('list.deleteItem')
  async deleteItem(payload: any) {
    // return this.appService.deleteItem(payload);
  }

  @MessagePattern('list.delete')
  async delete(payload: { id: string; token: string }) {
    return this.appService.delete(payload);
  }
}
