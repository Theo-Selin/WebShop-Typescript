import { HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { Product, ProductSchema } from '../products/schemas/products.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { Cart, CartSchema } from './schemas/cart.schema';

describe('CartsController', () => {
  let controller: CartsController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let cartModel: Model<Cart>;
  let productModel: Model<Product>;
  let userModel: Model<User>;
  let mockUser: User = null;
  let mockCart: Cart = null;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    cartModel = mongoConnection.model(Cart.name, CartSchema);
    productModel = mongoConnection.model(Product.name, ProductSchema);
    userModel = mongoConnection.model(User.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [
        CartsService,
        { provide: getModelToken(Cart.name), useValue: cartModel },
      ],
    }).compile();

    controller = module.get<CartsController>(CartsController);
  });

  beforeEach(async () => {
    mockUser = await userModel.create({
      fullName: 'test',
      email: 'test@test.com',
      password: 'test',
      role: 'admin',
    });
    mockCart = await cartModel.create({
      user: mockUser._id,
    });
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      collection.deleteMany({});
    }
  });

  describe('Cart', () => {
    it('cart status should be active', () => {
      expect(mockCart.status).toBe('active');
    });
    it('should return the cart based on id', async () => {
      const cart = await controller.findOne(mockCart._id);
      expect(cart._id.toString()).toBe(mockCart._id.toString());
    });
  });
});
