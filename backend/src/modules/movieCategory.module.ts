import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCategory } from '../entities/movieCategory.entity';
import { MovieCategoryRepository } from '../repository/movieCategory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieCategory])],
  controllers: [],
  providers: [MovieCategoryRepository],
  exports: [MovieCategoryRepository],
})
export class MovieCategoryModule {}
