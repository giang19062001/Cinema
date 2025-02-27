import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ShowDate } from '../entities/showDate.entity';

export class ShowDateRepository extends Repository<ShowDate> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(ShowDate, dataSource.createEntityManager());
  }
}
