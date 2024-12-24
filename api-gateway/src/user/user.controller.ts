import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }
}
