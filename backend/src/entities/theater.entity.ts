import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  theaterId: number;

  @Index({ unique: true })
  @Column()
  theaterCode: string;

  @Column()
  theaterName: string;

  @Column()
  theaterAddress: string;

  @Column()
  theaterImage: string;

  @Column({ default: true, nullable: true })
  theaterActive: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
