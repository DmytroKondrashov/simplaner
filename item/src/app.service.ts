import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async createItem(item: any, token: string): Promise<Item> {
    try {
      const result = await this.itemRepository.save(item);
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async getItem(id: number): Promise<Item> {
    return this.itemRepository.findOne({ where: { id } });
  }

  async updateItem(id: number, item: Item): Promise<Item> {
    await this.itemRepository.update(id, item);
    return this.itemRepository.findOne({ where: { id } });
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
