import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { In, DataSource } from 'typeorm';
import { DeleteResult } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDTO, UpdateMovieDTO } from '../dto/movie.dto';
import { CategoryRepository } from '../repository/category.repository';
import { MovieCategoryRepository } from '../repository/movieCategory.repository';
import { MovieCategory } from '../entities/movieCategory.entity';
import { MovieRepository } from '../repository/movie.repository';
import { Category } from '../entities/category.entity';
import { autoIncreaseCode } from '../utils/func';

@Injectable()
export class MovieService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Movie)
    private readonly movieRepo: MovieRepository,
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository(MovieCategory)
    private readonly movieCategoryRepository: MovieCategoryRepository,
  ) {}

  async findAll(): Promise<Movie[]> {
    const rowMovies = await this.movieRepo
      .createQueryBuilder('m')
      .leftJoin('movie_category', 'mc', 'm.movieCode = mc.movieCode')
      .leftJoin('category', 'c', 'mc.categoryCode = c.categoryCode')
      .select([
        'm.*',
        'c.categoryCode as categoryCode',
        'c.categoryName as categoryName',
      ])
      .getRawMany();

    console.log('rowMovies', rowMovies);

    // GROUP CATEGORY TO ARRAY CHILD OF MOVIE
    const movies = rowMovies.reduce((acc, movie) => {
      const existingMovie = acc.find((m) => m.movieCode === movie.movieCode);
      if (existingMovie) {
        existingMovie.categories.push({
          categoryCode: movie.categoryCode,
          categoryName: movie.categoryName,
        });
      } else {
        const { categoryCode, categoryName, ...restMovie } = movie;
        acc.push({
          ...restMovie,
          categories: [
            {
              categoryCode: movie.categoryCode,
              categoryName: movie.categoryName,
            },
          ],
        });
      }
      return acc;
    }, []);

    return movies;
  }

  async findOne(movieId: number): Promise<Movie> {
    return await this.movieRepo.findOne({
      where: { movieId },
      relations: ['categories'],
    });
  }

  async create(movieDto: CreateMovieDTO): Promise<Movie> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { categoryCodes, ...newMovie } = movieDto;

      const categories = await this.categoryRepository.findBy({
        categoryCode: In(categoryCodes),
      });

      const lastRow = await this.movieRepo.manager.query(
        'SELECT movieCode FROM movie ORDER BY movieId DESC LIMIT 1',
      );

      //INCREASE CODE
      let movieCode = autoIncreaseCode(lastRow, 'movieCode', 'MOV');

      const movie = queryRunner.manager.save(Movie, {
        movieCode: movieCode,
        ...newMovie,
      });

      //MAP CATEGORY WITH MOVIE
      if (movie && categories.length > 0) {
        for (const cate of categories) {
          await queryRunner.manager.save(MovieCategory, {
            movieCode: movieCode,
            categoryCode: cate.categoryCode,
          });
        }
      }

      //COMMMIT
      await queryRunner.commitTransaction();
      return movie;
    } catch (error) {
      // Rollback
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // release
      await queryRunner.release();
    }
  }

  async update(movieCode: string, movieDto: UpdateMovieDTO): Promise<Boolean> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { categoryCodes, ...movie } = movieDto;
      console.log('categoryCodes', categoryCodes);
      console.log('movie', movie);

      //UPDATE CATEGORY
      if (categoryCodes.length > 0) {
        const categoriesCurrent = await this.movieCategoryRepository.findBy({
          movieCode: movieCode,
        });

        //DELETE CATEGORY CURRENT
        if (categoriesCurrent.length > 0) {
          for (const cate of categoriesCurrent) {
            await queryRunner.manager.delete(MovieCategory, {
              movieCode: movieCode,
              categoryCode: cate.categoryCode,
            });
          }
        }

        // FIND CATEGORY
        const categories = await this.categoryRepository.findBy({
          categoryCode: In(categoryCodes),
        });

        //MAP NEW CATEGORIES WITH MOVIE
        if (movie && categories.length > 0) {
          const movieCategories = categories.map((cate) => ({
            movieCode: movieCode,
            categoryCode: cate.categoryCode,
          }));

          await queryRunner.manager.insert(MovieCategory, movieCategories);
        }
      }
      // UPPDATE MOVIE
      await queryRunner.manager.update(Movie, {movieCode: movieCode}, movie);
      //COMMMIT
      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      // Rollback
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // release
      await queryRunner.release();
    }
  }

  async delete(movieId: number): Promise<DeleteResult> {
    return await this.movieRepo.delete(movieId);
  }
}
