import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Room } from '../entities/room.entity';
import { RoomRepository } from '../repository/room.repository';
import { CreateRoomDTO, UpdateRoomDTO } from '../dto/room.dto';
import { autoIncreaseCode } from '../utils/func';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOne(roomId: number): Promise<Room> {
    return this.roomRepository.findOneBy({ roomId: roomId });
  }

  async create(room: CreateRoomDTO): Promise<Room> {
    const lastRow = await this.roomRepository.manager.query(
      'SELECT roomCode FROM room ORDER BY roomId DESC LIMIT 1',
    );

    //INCREASE CODE
    let roomCode = autoIncreaseCode(lastRow, 'roomCode', 'ROM');

    return this.roomRepository.save({
      roomCode: roomCode,
      ...room,
    });
  }

  async update(roomId: number, room: UpdateRoomDTO): Promise<UpdateResult> {
    return this.roomRepository.update(roomId, room);
  }

  async delete(roomId: number): Promise<DeleteResult> {
    return this.roomRepository.delete(roomId);
  }
}
