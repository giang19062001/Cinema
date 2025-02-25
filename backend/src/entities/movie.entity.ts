import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  movieId: number;

  @Index({ unique: true })
  @Column()
  movieCode: string;

  @Column()
  movieName: string;

  @Column()
  movieDescription: string;

  @Column()
  movieTrailer: string;

  @Column()
  movieImage: string;

  @Column()
  movieThumbnail: string;

  @Column()
  movieDuration: number;

  @Column({ type: 'date' })
  movieStartDate: Date;

  @Column({ default: true, nullable: true })
  movieActive: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
