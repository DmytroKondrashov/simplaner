import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SearchUserDto } from './dto/search-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    const res = await this.userRepository.save(newUser);
    return `User created successfully: ${res.id}`;
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
    const res = await query.getOne();
    return JSON.stringify(res);
  }

  async deleteUser(id: number) {
    const res = await this.userRepository.delete(id);
    return JSON.stringify(res);
  }
}
