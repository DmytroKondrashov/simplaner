import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { SearchUserDto } from './dto/search-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('API_GATEWAY_SERVICE') private readonly client: ClientKafka,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      await this.client.emit('user.created.success', newUser);
    } catch (error) {
      await this.client.emit('user.created.failed', { error: error.message });
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(data: SearchUserDto) {
    const { id, email } = data;
    const query = this.userRepository.createQueryBuilder('user');
    if (id) {
      query.where('user.id = :id', { id });
    }
    if (email) {
      query.where('user.email = :email', { email });
    }
    return query.getOne();
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
