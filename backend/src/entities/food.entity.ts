import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  foodId: number;

  @Index({ unique: true })
  @Column()
  foodCode: string;

  @Column()
  foodName: string;

  @Column({ type: 'int' })
  foodPrice: number;

  @Column()
  foodImage: string;

  @Column()
  foodDescription: string;

  @Column({ default: true, nullable: true })
  foodActive: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
