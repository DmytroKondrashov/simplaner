import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateListDto } from './dtos/create.list.dto';
import { UpdateListDto } from './dtos/update.post.dto';
import { ModifyItemDto } from './dtos/modify.item.dto';

@Injectable()
export class ListService implements OnModuleInit {
  constructor(@Inject('LIST_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    [
      'list.create',
      'list.findAll',
      'list.delete',
      'list.update',
      'list.addItem.reply',
      'list.deleteItem.reply',
    ].forEach((key) => this.client.subscribeToResponseOf(key));
  }

  async findAll(token: string) {
    return this.client.send('list.findAll', token);
  }

  async create(body: CreateListDto, token: string) {
    return this.client.send('list.create', { body, token });
  }

  async update(body: UpdateListDto, token: string) {
    return this.client.send('list.update', { body, token });
  }

  async addItem(body: ModifyItemDto, token: string) {
    return this.client.send('list.addItem', { body, token });
  }

  async deleteItem(body: ModifyItemDto, token: string) {
    return this.client.send('list.deleteItem', { body, token });
  }

  async delete(id: string, token: string) {
    return this.client.send('list.delete', { id, token });
  }
}
