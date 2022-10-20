import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
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
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
