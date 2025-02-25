import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from '../repository/room.repository';
import { RoomService } from '../services/room.service';
import { RoomController } from '../controllers/room.controller';
import { Room } from '../entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  exports: [RoomRepository],
})
export class RoomModule {}
