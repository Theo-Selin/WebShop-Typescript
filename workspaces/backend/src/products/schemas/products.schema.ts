import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  weight: number;

  @Prop()
  price: number;

  @Prop()
  manufacturer: string;

  @Prop()
  images: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @Type(() => Category)
  category: Category;
}

const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ name: 'text', description: 'text' });

export { ProductSchema };
