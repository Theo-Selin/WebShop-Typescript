import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export class DeliveryAddress {
  @IsNotEmpty({ message: 'Not empty' })
  streetAdress: string;
  @IsNotEmpty({ message: 'Not empty' })
  zipCode: string;
  @IsNotEmpty({ message: 'Not empty' })
  city: string;
  @IsNotEmpty({ message: 'Not empty' })
  country: string;
}

export class AccountRole {
  type: 'admin' | 'customer';
}

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  deliveryAdress: DeliveryAddress;

  @Prop({ default: 'customer' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
