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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { User } from './schemas/user.schema';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { Public } from '../auth/decorators/public.decorator';
import { ResponseDto } from '../utils/response-dto.decorator';
import { FindOneResponseDto } from './dto/find-one-response.dto';
import { Request } from 'express';
import { UpdateLoggedInUserDto } from './dto/update-logged-in-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CheckoutDto } from './dto/checkout.dto';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

@UseInterceptors(MongooseClassSerializerInterceptor({ defaultClass: User }))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('me/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
  ) {
    const { userId } = req.user as JwtPayload;
    return await this.usersService.updatePassword(
      userId.toString(),
      changePasswordDto,
    );
  }

  @Post('checkout')
  async checkout(@Req() req: Request, @Body() checkoutDto: CheckoutDto) {
    const { userId } = req.user as JwtPayload;
    console.log(userId);
    return await this.usersService.checkout(userId, checkoutDto);
  }

  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ResponseDto(FindOneResponseDto)
  @Get('me')
  async findLoggedInUser(@Req() req: Request) {
    const { userId } = req.user as JwtPayload;
    return await this.usersService.findOne(userId.toString());
  }

  @ResponseDto(FindOneResponseDto)
  @Roles(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch('me')
  async updateLoggedInUser(
    @Body() updatedLoggedInUserDto: UpdateLoggedInUserDto,
    @Req() req: Request,
  ) {
    const { userId } = req.user as JwtPayload;
    return await this.usersService.update(userId, updatedLoggedInUserDto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
