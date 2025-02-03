import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { CreateListDto } from './dtos/create.list.dto';
import { UpdateListDto } from './dtos/update.list.dto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @Inject('API_GATEWAY_SERVICE') private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('list.findAll');
    this.client.subscribeToResponseOf('list.create');
    this.client.subscribeToResponseOf('list.update');
    this.client.subscribeToResponseOf('list.delete');
  }

  async decodeToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async findAll(token: string) {
    try {
      const decodedToken = await this.decodeToken(token);
      return this.listRepository.find({ where: { userId: decodedToken.id } });
    } catch (error) {
      console.log({ error });
      throw new RpcException({
        statusCode: 403,
        message: error.message,
      });
    }
  }

  async create(payload: CreateListDto) {
    try {
      const { body, token } = payload;
      const decodedToken = await this.decodeToken(token);
      return this.listRepository.save({ ...body, userId: decodedToken.id });
    } catch (error) {
      console.log({ error });
      throw new RpcException({
        statusCode: 403,
        message: error.message,
      });
    }
  }

  async update(payload: UpdateListDto) {
    try {
      const decodedToken = await this.decodeToken(payload.token);
      await this.listRepository.update(payload.body.id, {
        ...payload.body,
        userId: Number(decodedToken.id),
      });
      const res = await this.listRepository.findOne({
        where: { id: payload.body.id, userId: Number(decodedToken.id) },
      });
      return JSON.stringify(res);
    } catch (error) {
      console.log({ error });
      throw new RpcException({
        statusCode: 403,
        message: error.message,
      });
    }
  }

  async addItem(payload: any) {
    try {
      payload.body.items.forEach((item) => {
        item.listId = payload.body.id;
      });
      // TODO: Add items to list!
      await this.listRepository.update(payload.body.id, {
        ...payload.body,
      });
      const res = await this.listRepository.findOne({
        where: { id: payload.body.id },
      });
      return JSON.stringify(res);
    } catch (error) {
      throw new RpcException({
        statusCode: 403,
        message: error.message,
      });
    }
  }

  async delete(payload: { id: string; token: string }) {
    try {
      const decodedToken = await this.decodeToken(payload.token);
      await this.listRepository.delete({
        id: Number(payload.id),
        userId: Number(decodedToken.id),
      });
      return { message: 'List deleted successfully' };
    } catch (error) {
      console.log({ error });
      throw new RpcException({
        statusCode: 403,
        message: error.message,
      });
    }
  }
}
