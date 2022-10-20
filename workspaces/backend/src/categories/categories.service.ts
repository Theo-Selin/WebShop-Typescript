import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoryModel.create(createCategoryDto);
    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      {
        returnDocument: 'after',
      },
    );

    return category;
  }

  async delete(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    return category;
  }
}
