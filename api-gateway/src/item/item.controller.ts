import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dtos/create.item.dto';
import { UpdateItemDto } from './dtos/update.item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async createItem(
    @Body() payload: CreateItemDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader.replace('Bearer ', '');
    return this.itemService.createItem(payload, token);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() payload: UpdateItemDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader.replace('Bearer ', '');
    return this.itemService.updateItem(payload, token);
  }

  @Delete(':id')
  async deleteItem(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    const token = authHeader.replace('Bearer ', '');
    return this.itemService.deleteItem(id, token);
  }

  @Get()
  async findAll(
    @Headers('Authorization') authHeader: string,
    @Query('listId') listId: string,
  ) {
    const token = authHeader.replace('Bearer ', '');
    return this.itemService.findAll(token, listId);
  }
}
