import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('date_movie')
export class DateMovie {
  @PrimaryGeneratedColumn()
  id: number;

//   @Index({ unique: true })
  @Column()
  dateMovieCode: string;

  @Column()
  movieCode: string;

  @Column()
  theaterCode: string;

  @Column({ type: 'date' })
  dateRelease: string;

  @Column({ default: true, nullable: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
