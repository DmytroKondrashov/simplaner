import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateListDto } from './dtos/create.list.dto';
import { UpdateListDto } from './dtos/update.post.dto';

@Injectable()
export class ListService {
  constructor(private readonly client: ClientProxy) {}

  async findAll(token: string) {
    return this.client.send('list.findAll', { token });
  }

  async create(body: CreateListDto) {
    return this.client.send('list.create', { body });
  }

  async update(body: UpdateListDto) {
    return this.client.send('list.update', { body });
  }

  async delete(id: string, token: string) {
    return this.client.send('list.delete', { id, token });
  }
}
