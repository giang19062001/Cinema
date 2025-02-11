import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @Column({ default: true, nullable: true })
  categoryActive: boolean;

  @ManyToMany(() => Movie, (movie) => movie.categories)
  movies?: Movie[];

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
