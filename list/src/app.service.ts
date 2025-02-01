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
    const decodedToken = await this.decodeToken(token);
    return this.listRepository.find({ where: { userId: decodedToken.id } });
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
        message: 'Invalid or expired token',
      });
    }
  }

  async update(body: UpdateListDto, token: string) {
    const decodedToken = await this.jwtService.verifyAsync(token);
    return this.listRepository.update(body.id, {
      ...body,
      userId: Number(decodedToken.id),
    });
  }

  async delete(id: number, token: string) {
    const decodedToken = await this.jwtService.verifyAsync(token);
    return this.listRepository.delete({ id, userId: Number(decodedToken.id) });
  }
}
