import { ObjectId } from 'mongoose';

export class CreateCartDto {
  readonly user: ObjectId;
}
