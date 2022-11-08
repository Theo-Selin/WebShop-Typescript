import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/users/users.controller';
import { ResponseDto } from 'src/utils/response-dto.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { FindOneResponseDto } from './dto/find-one-response.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity-cart.dto';
import { Cart } from './schemas/cart.schema';

@Controller('carts')
@UseInterceptors(MongooseClassSerializerInterceptor({ defaultClass: Cart }))
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // Todo: Remove
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
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

  @ResponseDto(FindOneResponseDto)
  @Get('active')
  async findActiveCart(@Req() req: Request) {
    const { userId } = req.user as JwtPayload;
    return await this.cartsService.findActiveCart(userId);
  }

  @ResponseDto(FindOneResponseDto)
  @Get('checked-out')
  async findCheckedOut(@Req() req: Request) {
    const { userId } = req.user as JwtPayload;
    return await this.cartsService.findPlacedOrders(userId);
  }

  @Roles(Role.Admin)
  @ResponseDto(FindOneResponseDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartsService.findOne(id);
  }

  @Patch('active/add-product')
  async addToActiveCart(
    @Req() req: Request,
    @Body() addToCartDto: AddToCartDto,
  ) {
    const { userId } = req.user as JwtPayload;
    return await this.cartsService.addToActiveCart(userId, addToCartDto);
  }

  @Patch('active/update-quantity')
  async updateActiveQuantity(
    @Req() req: Request,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    const { userId } = req.user as JwtPayload;
    return await this.cartsService.updateActiveQuantity(
      userId,
      updateQuantityDto,
    );
  }

  @Patch('active/empty')
  async emptyActiveCart(@Req() req: Request) {
    const { userId } = req.user as JwtPayload;
    return await this.cartsService.emptyActiveCart(userId);
  }

  @Roles(Role.Admin)
  @Patch(':id/add-product')
  async addToCart(@Param('id') id: string, @Body() addToCartDto: AddToCartDto) {
    return await this.cartsService.addToCart(id, addToCartDto);
  }

  @Roles(Role.Admin)
  @Patch(':id/update-quantity')
  async updateQuantity(
    @Param('id') id: string,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    return await this.cartsService.updateQuantity(id, updateQuantityDto);
  }

  @Roles(Role.Admin)
  @Patch(':id/empty')
  async emptyCart(@Param('id') id: string) {
    return await this.cartsService.emptyCart(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartsService.update(id, updateCartDto);
  }
}
