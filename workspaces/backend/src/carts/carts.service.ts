import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductNotFoundException } from 'src/products/exceptions/productNotFound.exception';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Product, ProductDocument } from '../products/schemas/products.schema';
import { setCartPriceAndWeight } from './cart.helpers';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity-cart.dto';
import { CartNotFoundException } from './exceptions/cartNotFound.exception';
import { ProductNotFoundInCartException } from './exceptions/productNotFoundInCart.exception';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  private readonly logger = new Logger(CartsService.name);

  async create(createCartDto: CreateCartDto): Promise<CartDocument> {
    const newCart = await this.cartModel.create(createCartDto);
    this.logger.log(`Cart ${newCart.id} for user ${newCart.user} created`);
    return newCart;
  }

  async findAll(): Promise<Cart[]> {
    const carts = await this.cartModel.find().populate('products');
    return carts;
  }

  async findOne(id: string): Promise<Cart> {
    try {
      const cart = await this.cartModel
        .findById(id)
        .populate('user')
        .populate({
          path: 'products',
          populate: {
            path: 'productId',
            model: 'Product',
            populate: [
              {
                path: 'category',
                model: 'Category',
              },
              {
                path: 'images',
                model: 'Upload',
              },
            ],
          },
        });

      if (cart) {
        return cart;
      } else {
        throw new CartNotFoundException(id);
      }
    } catch (err) {
      throw new CartNotFoundException(id);
    }
  }

  async findActiveCart(userId: string) {
    const user = await this.userModel.findById(userId);
    return this.findOne(user.activeCart);
  }

  async addToActiveCart(userId: string, addToCartDto: AddToCartDto) {
    const user = await this.userModel.findById(userId);
    return this.addToCart(user.activeCart, addToCartDto);
  }

  async addToCart(id: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const cart = await this.cartModel.findById(id);
    if (!cart) {
      throw new CartNotFoundException(id);
    }
    if (!(await this.productModel.findById(addToCartDto.productId))) {
      throw new ProductNotFoundException(addToCartDto.productId);
    }

    const product = cart.products.find(
      ({ productId }) => productId.toString() === addToCartDto.productId,
    ) || { productId: addToCartDto.productId, quantity: 0 };

    product.quantity += addToCartDto.quantity;

    cart.products = [
      ...cart.products.filter(
        ({ productId }) => productId.toString() !== addToCartDto.productId,
      ),
      product,
    ];

    const productsInCart = await this.productModel.find({
      _id: { $in: cart.products.map((product) => product.productId) },
    });

    setCartPriceAndWeight(cart, productsInCart);

    this.logger.log(`Product ${addToCartDto.productId} added to cart ${id}`);

    return await cart.save();
  }

  async updateActiveQuantity(
    userId: string,
    updateQuantityDto: UpdateQuantityDto,
  ) {
    const user = await this.userModel.findById(userId);
    return this.updateQuantity(user.activeCart, updateQuantityDto);
  }

  async updateQuantity(
    id: string,
    updateQuantityDto: UpdateQuantityDto,
  ): Promise<Cart> {
    const cart = await this.cartModel.findById(id);
    const productIndex = cart.products.findIndex(
      ({ productId }) => productId.toString() === updateQuantityDto.productId,
    );
    if (productIndex >= 0) {
      if (updateQuantityDto.quantity === 0) {
        cart.products = cart.products.filter(
          ({ productId }) =>
            productId.toString() !== updateQuantityDto.productId,
        );
      } else {
        cart.products[productIndex].quantity = updateQuantityDto.quantity;
      }

      const productsInCart = await this.productModel.find({
        _id: { $in: cart.products.map((product) => product.productId) },
      });

      setCartPriceAndWeight(cart, productsInCart);

      return await cart.save();
    } else {
      throw new ProductNotFoundInCartException(updateQuantityDto.productId, id);
    }
  }

  async emptyActiveCart(userId: string) {
    const user = await this.userModel.findById(userId);
    return this.emptyCart(user.activeCart);
  }

  async emptyCart(id: string) {
    const cart = await this.cartModel.findById(id);
    if (!cart) {
      throw new CartNotFoundException(id);
    }
    cart.products = [];

    const productsInCart = await this.productModel.find({
      _id: { $in: cart.products.map((product) => product.productId) },
    });

    setCartPriceAndWeight(cart, productsInCart);
    return await cart.save();
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartModel.findByIdAndUpdate(id, updateCartDto, {
      returnDocument: 'after',
    });
    if (!cart) {
      throw new CartNotFoundException(id);
    }
    return cart;
  }

  async remove(id: string): Promise<Cart> {
    return await this.cartModel.findByIdAndDelete(id);
  }
}
