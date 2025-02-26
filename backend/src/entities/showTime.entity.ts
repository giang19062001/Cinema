import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('show_time')
export class ShowTime {
  @PrimaryGeneratedColumn()
  ShowTimeId: number;

  //   @Index({ unique: true })
  @Column()
  showTimeCode: string;

  @Column()
  showDateCode: string;

  @Column()
  roomCode: string;

  @Column({ type: 'time' })
  timeRelease: string;

  @Column({ default: true, nullable: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
