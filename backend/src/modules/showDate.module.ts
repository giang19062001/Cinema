import { ShowDateService } from './../services/showDate.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowDate } from '../entities/showDate.entity';
import { ShowDateController } from '../controllers/showDate.controller';
import { ShowDateRepository } from '../repository/showDate.repository';
import { TheaterModule } from './theater.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShowDate]), TheaterModule],
  controllers: [ShowDateController],
  providers: [ShowDateService, ShowDateRepository],
  exports: [ShowDateRepository],
})
export class ShowDateModule {}
