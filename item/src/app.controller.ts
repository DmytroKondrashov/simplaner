import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from './entities/item.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('item.create')
  createItem(item: Item): Promise<Item> {
    return this.appService.createItem(item);
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
