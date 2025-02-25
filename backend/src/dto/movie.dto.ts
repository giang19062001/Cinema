import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';

export class CreateMovieDTO {
  @ApiProperty()
  movieName: string;

  @ApiProperty()
  movieDescription: string;

  @ApiProperty()
  movieTrailer: string;

  @ApiProperty()
  movieImage: string;

  @ApiProperty()
  movieThumbnail: string;

  @ApiProperty()
  movieDuration: number;

  @ApiProperty({ format: 'date' })
  movieStartDate: Date;

  @ApiProperty({ isArray: true, nullable: false, type: () => Number })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ArrayNotEmpty()
  categoryCodes: number[];
}
export class UpdateMovieDTO {
  @ApiProperty()
  movieName: string;

  @ApiProperty()
  movieDescription: string;

  @ApiProperty()
  movieTrailer: string;

  @ApiProperty()
  movieImage: string;

  @ApiProperty()
  movieThumbnail: string;

  @ApiProperty()
  movieDuration: number;

  @ApiProperty({ format: 'date' })
  movieStartDate: Date;

  @ApiProperty()
  movieActive: boolean;

  @ApiProperty({ isArray: true, nullable: false, type: () => Number })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @ArrayNotEmpty()
  categoryCodes: number[];
}
