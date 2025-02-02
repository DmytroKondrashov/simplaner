import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from './entities/item.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('item.create')
  createItem(payload: { item: Item; token: string }): Promise<Item> {
    const { token, ...item } = payload;
    return this.appService.createItem(item, token);
  }

  @MessagePattern('item.get')
  getItem(id: number): Promise<Item> {
    return this.appService.getItem(id);
  }

  @MessagePattern('item.update')
  updateItem(item: Item, id: number): Promise<Item> {
    return this.appService.updateItem(id, item);
  }

  @MessagePattern('item.delete')
  deleteItem(id: number): Promise<void> {
    return this.appService.deleteItem(id);
  }
}
