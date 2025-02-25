import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';

export class MovieRepository extends Repository<Movie> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(Movie, dataSource.createEntityManager());
  }
}
