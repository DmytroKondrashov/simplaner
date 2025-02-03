import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dtos/create.list.dto';
import { UpdateListDto } from './dtos/update.post.dto';
import { ModifyItemDto } from './dtos/modify.item.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('all')
  async findAll(@Headers('Authorization') authHeader: string) {
    const token = authHeader.replace('Bearer ', '');
    return this.listService.findAll(token);
  }

  @Post('create')
  async create(
    @Body() body: CreateListDto,
    @Headers('Authorization') token: string,
  ) {
    const clearedToken = token.replace('Bearer ', '');
    return this.listService.create(body, clearedToken);
  }

  @Post('update')
  async update(
    @Body() body: UpdateListDto,
    @Headers('Authorization') token: string,
  ) {
    const clearedToken = token.replace('Bearer ', '');
    return this.listService.update(body, clearedToken);
  }

  @Post('addItem')
  async addItem(
    @Body() body: ModifyItemDto,
    @Headers('Authorization') token: string,
  ) {
    const clearedToken = token.replace('Bearer ', '');
    return this.listService.addItem(body, clearedToken);
  }

  @Post('deleteItem')
  async deleteItem(
    @Body() body: ModifyItemDto,
    @Headers('Authorization') token: string,
  ) {
    const clearedToken = token.replace('Bearer ', '');
    return this.listService.deleteItem(body, clearedToken);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader.replace('Bearer ', '');
    return this.listService.delete(id, token);
  }
}
