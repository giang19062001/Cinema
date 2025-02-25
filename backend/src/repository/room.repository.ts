import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Room } from '../entities/room.entity';

export class RoomRepository extends Repository<Room> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }
}
