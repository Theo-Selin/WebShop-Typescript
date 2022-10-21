import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity-cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
  ) {}
  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const newCart = await this.cartModel.create(createCartDto);
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
          },
        });
      if (cart) {
        return cart;
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: ['Cart not found'],
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Cart not found'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addToCart(id: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const cart = await this.cartModel.findById(id);
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

    return await cart.save();
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
      return await cart.save();
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: [
            `Product with id '${updateQuantityDto.productId}' not found in cart.`,
          ],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(id: string): Promise<Cart> {
    return await this.cartModel.findByIdAndDelete(id);
  }
}
