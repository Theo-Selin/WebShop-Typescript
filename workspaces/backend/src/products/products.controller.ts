import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/products.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsService) {}

  @Post()
  async create(@Body() product: Product) {
    return await this.productsServices.create(product);
  }

  @Get()
  async getAllProducts() {
    return await this.productsServices.findAll();
  }
}
