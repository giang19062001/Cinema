import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theater } from '../entities/theater.entity';
import { TheaterRepository } from '../repository/theater.repository';
import { TheaterController } from '../controllers/theater.controller';
import { TheaterService } from '../services/theater.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Theater])],
  controllers: [TheaterController],
  providers: [TheaterService, TheaterRepository],
  exports: [TheaterRepository],
})
export class TheaterModule {}
