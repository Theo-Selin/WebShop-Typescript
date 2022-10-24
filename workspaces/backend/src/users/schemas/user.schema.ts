import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Document, ObjectId } from 'mongoose';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Transform(({ value, obj }) => {
    return obj._id.toString();
  })
  _id: ObjectId;

  @Prop()
  fullName: string;

  @Exclude()
  @Prop()
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
