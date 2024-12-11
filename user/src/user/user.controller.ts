import {
  // Body,
  Controller,
  Delete,
  Get,
  Param,
  // Post,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import UserUniquenessGuard from 'src/guards/user-uniqueness.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @UseGuards(UserUniquenessGuard)
  // create(@Body() user: CreateUserDto) {
  //   return this.userService.create(user);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('email') email: string) {
    return this.userService.findOne({ id: Number(id), email });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
