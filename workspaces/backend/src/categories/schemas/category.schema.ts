import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Prop()
  name: string;

  @Prop()
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
