import { AppModule } from '../app.module';
import { NestFactory } from '@nestjs/core';
import { ProductsService } from '../products/products.service';
import { readFileSync } from 'fs';
import * as path from 'path';

export const initProducts = async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsService = app.get(ProductsService);
  const products = JSON.parse(
    readFileSync(path.resolve(__dirname, '../../assets/products.json'), 'utf8'),
  );
  const currentProducts = await productsService.findAll();

  if (currentProducts.length === 0) {
    products.forEach(async (product) => {
      await productsService.create(product);
    });
  }
};
