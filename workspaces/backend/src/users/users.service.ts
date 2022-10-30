import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CartsService } from '../carts/carts.service';
import { ConfigService } from '@nestjs/config';
import { UpdateLoggedInUserDto } from './dto/update-logged-in-user.dto';
import { EmailExistsException } from './exceptions/userEmailExists.exception';
import { UserNotFoundException } from './exceptions/userNotFound.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly cartsService: CartsService,
    private readonly config: ConfigService,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hash = await bcrypt.hash(
        createUserDto.password,
        parseInt(this.config.get('SALT_ROUNDS')),
      );
      createUserDto.password = hash;
      const newUser = await this.userModel.create(createUserDto);
      const cart = await this.cartsService.create({
        user: newUser._id.toString(),
      });
      newUser.activeCart = cart._id;
      await newUser.save();

      this.logger.log(`New user created ${newUser.email} ${newUser.id}`);
      return newUser;
    } catch (err) {
      throw new EmailExistsException();
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('activeCart');
    if (user) {
      return user;
    } else {
      throw new UserNotFoundException(id);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto | UpdateLoggedInUserDto,
  ): Promise<User> {
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
