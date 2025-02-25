import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { FoodRepository } from '../repository/food.repository';
import { Food } from '../entities/food.entity';
import { CreateFoodDTO, UpdateFoodDTO } from '../dto/food.dto';
import { autoIncreaseCode } from '../utils/func';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodRepository)
    private readonly foodRepository: FoodRepository,
  ) {}

  async findAll(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  async findOne(foodId: number): Promise<Food> {
    return this.foodRepository.findOneBy({ foodId: foodId });
  }

  async create(food: CreateFoodDTO): Promise<Food> {
    const lastRow = await this.foodRepository.manager.query(
      'SELECT foodCode FROM food ORDER BY foodId DESC LIMIT 1',
    );

    //INCREASE CODE
    let theaterCode = autoIncreaseCode(lastRow, 'foodCode', 'FOD');

    return this.foodRepository.save({
      foodCode: theaterCode,
      ...food,
    });
  }

  async update(foodId: number, food: UpdateFoodDTO): Promise<UpdateResult> {
    return this.foodRepository.update(foodId, food);
  }

  async delete(foodId: number): Promise<DeleteResult> {
    return this.foodRepository.delete(foodId);
  }
}
