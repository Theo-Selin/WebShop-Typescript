import { AppModule } from 'src/app.module';
import { NestFactory } from '@nestjs/core';
import { ProductsService } from 'src/products/products.service';
import { readFileSync } from 'fs';

export const initProducts = async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsService = app.get(ProductsService);
  const products = JSON.parse(readFileSync('assets/products.json', 'utf8'));
  const currentProducts = await productsService.findAll();

  if (currentProducts.length === 0) {
    products.forEach(async (product) => {
      await productsService.create(product);
    });
  }
};
