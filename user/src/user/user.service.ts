import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { SearchUserDto } from './dto/search-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { KafkapublisherService } from 'src/kafkapublisher/kafkapublisher.service';

@Injectable()
export class UserService {
  constructor(
    private readonly kafkaPublisher: KafkapublisherService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    try {
      console.log('==============');
      console.log('User-service is creating...', user);
      console.log('==============');
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      console.log('User-service is saved...', newUser);
      await this.kafkaPublisher.produce(newUser, 'user.created.success');
    } catch (error) {
      console.log('==============');
      console.log('User-service is failed...');
      console.log('==============');
      await this.kafkaPublisher.produce(
        { error: error.message },
        'user.created.failed',
      );
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
