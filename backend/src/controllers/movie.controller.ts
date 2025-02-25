import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDTO, UpdateMovieDTO } from '../dto/movie.dto';

@ApiTags('Movie')
@Controller('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.movieService.findOne(id);
  }

  @Post()
  create(@Body() movie: CreateMovieDTO) {
    return this.movieService.create(movie);
  }

  @Put(':code')
  update(@Param('code') code: string, @Body() movie: UpdateMovieDTO) {
    return this.movieService.update(code, movie);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.movieService.delete(id);
  }
}
