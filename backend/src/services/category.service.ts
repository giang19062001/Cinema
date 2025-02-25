import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dto/category.dto';
import { Category } from '../entities/category.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CategoryRepository } from '../repository/category.repository';
import { autoIncreaseCode } from '../utils/func';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository, // Injecting the custom CategoryRepository
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(categoryId: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ categoryId: categoryId });
  }

  async create(category: CreateCategoryDTO): Promise<Category> {
    const lastRow = await this.categoryRepository.manager.query(
      'SELECT categoryCode FROM category ORDER BY categoryId DESC LIMIT 1',
    );

    //INCREASE CODE
    let categoryCode = autoIncreaseCode(lastRow, 'categoryCode', 'CAT');

    return this.categoryRepository.save({
      categoryCode: categoryCode,
      ...category,
    });
  }

  async update(
    categoryId: number,
    category: UpdateCategoryDTO,
  ): Promise<UpdateResult> {
    return this.categoryRepository.update(categoryId, category);
  }

  async delete(categoryId: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(categoryId);
  }
}
