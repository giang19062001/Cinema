import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomService } from '../services/room.service';
import { CreateRoomDTO, UpdateRoomDTO } from '../dto/room.dto';
import { Room } from '../entities/room.entity';

@ApiTags('Room')
@Controller('Room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.roomService.findOne(id);
  }

  @Post()
  create(@Body() room: CreateRoomDTO) {
    return this.roomService.create(room);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() room: UpdateRoomDTO) {
    return this.roomService.update(id, room);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.roomService.delete(id);
  }
}
