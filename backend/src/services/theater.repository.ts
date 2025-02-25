import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { TheaterRepository } from '../repository/theater.repository';
import { Theater } from '../entities/theater.entity';
import { CreateTheaterDTO, UpdateTheaterDTO } from '../dto/theater.dto';
import { autoIncreaseCode } from '../utils/func';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(TheaterRepository)
    private readonly theaterRepository: TheaterRepository,
  ) {}

  async findAll(): Promise<Theater[]> {
    return this.theaterRepository.find();
  }

  async findOne(theaterId: number): Promise<Theater> {
    return this.theaterRepository.findOneBy({ theaterId: theaterId });
  }

  async create(theater: CreateTheaterDTO): Promise<Theater> {
    const lastRow = await this.theaterRepository.manager.query(
      'SELECT theaterCode FROM theater ORDER BY theaterId DESC LIMIT 1',
    );

    //INCREASE CODE
    let theaterCode = autoIncreaseCode(lastRow, 'theaterCode', 'THE');

    return this.theaterRepository.save({
      theaterCode: theaterCode,
      ...theater,
    });
  }

  async update(
    theaterId: number,
    theater: UpdateTheaterDTO,
  ): Promise<UpdateResult> {
    return this.theaterRepository.update(theaterId, theater);
  }

  async delete(theaterId: number): Promise<DeleteResult> {
    return this.theaterRepository.delete(theaterId);
  }
}
