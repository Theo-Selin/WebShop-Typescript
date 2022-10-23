import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    createUserDto.password = hash;
    const newUser = await this.userModel.create(createUserDto);
    this.logger.log(`New user created ${newUser.email} ${newUser.id}`);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      returnDocument: 'after',
    });
    this.logger.log(`User: ${user.id} updated ${updateUserDto}`);
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
