import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('show_date')
export class ShowDate {
  @PrimaryGeneratedColumn()
  showDateId: number;

  //   @Index({ unique: true })
  @Column()
  showDateCode: string;

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
