import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SearchUserDto } from './dto/search-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('AUTH_SERVICE') private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('authenticate_user');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && bcrypt.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const token$ = this.client.send('authenticate_user', payload);
    const token = firstValueFrom(token$);
    return { message: `User logged in successfully: ${user.id}`, token };
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    const res = await this.userRepository.save(newUser);
    const token$ = this.client.send('authenticate_user', {
      email: res.email,
      id: res.id,
    });
    const token = firstValueFrom(token$);
    return { message: `User created successfully: ${res.id}`, token };
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
