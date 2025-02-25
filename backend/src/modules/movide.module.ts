import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie.entity';
import { MovieController } from '../controllers/movie.controller';
import { CategoryModule } from './category.module';
import { MovieCategoryModule } from './movieCategory.module';
import { Category } from '../entities/category.entity';
import { MovieCategory } from '../entities/movieCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Category, MovieCategory]),
    CategoryModule,
    MovieCategoryModule,
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
