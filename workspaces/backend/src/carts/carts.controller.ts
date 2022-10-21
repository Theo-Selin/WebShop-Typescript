import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return await this.cartsService.create(createCartDto);
  }

  @Get()
  async findAll() {
    return await this.cartsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartsService.findOne(id);
  }

  @Patch(':id/add-product')
  async addToCart(@Param('id') id: string, @Body() addToCartDto: AddToCartDto) {
    return await this.cartsService.addToCart(id, addToCartDto);
  }

  @Patch(':id/update-quantity')
  async updateQuantity(
    @Param('id') id: string,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    return await this.cartsService.updateQuantity(id, updateQuantityDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartsService.remove(id);
  }
}
