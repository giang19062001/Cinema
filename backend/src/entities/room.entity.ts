import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  roomId: number;

  @Index({ unique: true })
  @Column()
  roomCode: string;

  @Column()
  theaterCode: string;

  @Column()
  roomName: string;

  @Column({ default: true, nullable: true })
  roomActive: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
