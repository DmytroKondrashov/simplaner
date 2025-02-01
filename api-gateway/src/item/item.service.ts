import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateItemDto } from './dtos/create.item.dto';
import { UpdateItemDto } from './dtos/update.item.dto';

@Injectable()
export class ItemService {
  constructor(@Inject('ITEM_SERVICE') private readonly client: ClientKafka) {}

  async createItem(payload: CreateItemDto, token: string) {
    return this.client.send('item.create', { ...payload, token });
  }

  async updateItem(payload: UpdateItemDto, token: string) {
    return this.client.send('item.update', { ...payload, token });
  }

  async findAll(token: string, listId: string) {
    return this.client.send('item.findAll', {
      token,
      listId,
    });
  }

  async findOne(id: string, token: string) {
    return this.client.send('item.findOne', { id, token });
  }

  async deleteItem(id: string, token: string) {
    return this.client.send('item.delete', { id, token });
  }
}
