import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/web-shop'),
    ConfigModule,
    ProductsModule,
    CategoriesModule,
    UsersModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
