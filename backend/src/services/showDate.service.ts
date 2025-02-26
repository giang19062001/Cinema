import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TheaterRepository } from '../repository/theater.repository';
import { DataSource } from 'typeorm';
import { FilterShowDateDTO } from '../dto/showDate.dto';

@Injectable()
export class ShowDateService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(TheaterRepository)
    private readonly theaterRepository: TheaterRepository,
  ) {}

  async filterList(parameter: FilterShowDateDTO): Promise<any[]> {
    console.log('parameter', parameter);
    const theaters = this.theaterRepository.find();
    console.log('theaters', theaters);
    return [];
  }
}
