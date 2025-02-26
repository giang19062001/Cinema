import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  seatId: number;

  @Index({ unique: true })
  @Column()
  seatCode: string;

  @Column()
  roomCode: string;

  @Column()
  seatCharacter: string;

  @Column()
  seatName: string;

  @Column()
  seatStatus: string; // FREE, BOOKING, BOOKED

  @Column({ default: true, nullable: true })
  seatActive: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
