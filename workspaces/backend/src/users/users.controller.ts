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

interface JwtPayload {
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
