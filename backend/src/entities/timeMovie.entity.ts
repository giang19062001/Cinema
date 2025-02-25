import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('time_movie')
export class TimeMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateMovieCode: string;

  @Column()
  roomCode: string;

  @Column({ type: 'varchar', length: 5 }) // Stores "HH:mm"
  timeRelease: string;


  @Column({ default: true, nullable: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
