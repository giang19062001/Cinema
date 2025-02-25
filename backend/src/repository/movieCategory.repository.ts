import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MovieCategory } from '../entities/movieCategory.entity';

export class MovieCategoryRepository extends Repository<MovieCategory> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(MovieCategory, dataSource.createEntityManager());
  }
}
