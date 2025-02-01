import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateItemDto } from './dtos/create.item.dto';
import { UpdateItemDto } from './dtos/update.item.dto';

@Injectable()
export class ItemService {
  constructor(@Inject('ITEM_SERVICE') private readonly client: ClientKafka) {}

  async createItem(payload: CreateItemDto) {
    return this.client.send('item.create', payload);
  }

  async updateItem(payload: UpdateItemDto) {
    return this.client.send('item.update', payload);
  }

  async findAll(token: string) {
    return this.client.send('item.findAll', {
      token,
    });
  }

  async findOne(id: string, token: string) {
    return this.client.send('item.findOne', { id, token });
  }

  async deleteItem(id: string, token: string) {
    return this.client.send('item.delete', { id, token });
  }
}
