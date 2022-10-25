import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Address & Document;

@Schema()
export class Address {
  @Prop()
  streetAddress: string;

  @Prop()
  zipCode: string;

  @Prop()
  city: string;

  @Prop()
  country: string;
}

export const UserSchema = SchemaFactory.createForClass(Address);
