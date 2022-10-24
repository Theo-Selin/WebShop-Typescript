import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity-cart.dto';
import { CartStatus } from './schemas/cart.schema';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // Todo: Remove
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    console.log(CartStatus);
    return await this.cartsService.create(createCartDto);
  }

  // TODO: Remove
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartsService.remove(id);
  }

  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.cartsService.findAll();
  }

  @Roles(Role.Admin)
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

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }
}
