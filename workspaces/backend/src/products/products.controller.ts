import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/products.schema';

@UseInterceptors(MongooseClassSerializerInterceptor({ defaultClass: Product }))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsServices.create(createProductDto);
  }

  @Public()
  @Get()
  async findAll(@Query('search') searchQuery: string) {
    return await this.productsServices.findAll(searchQuery);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsServices.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsServices.update(id, updateProductDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsServices.remove(id);
  }
}
