import {ICategory} from './category.inteface';

export interface IMovie {
  movieId: number;
  movieCode: string;
  movieName: string;
  movieDescription: string;
  movieTrailer: string;
  movieImage: string;
  movieThumbnail: string;
  movieDuration: number;
  movieStartDate: Date;
  movieActive: boolean;
}

export interface IMovieCategories {
  movieId: number;
  movieCode: string;
  movieName: string;
  movieDescription: string;
  movieTrailer: string;
  movieImage: string;
  movieThumbnail: string;
  movieDuration: number;
  movieStartDate: Date;
  movieActive: boolean;
  categories: [ICategory];
}
