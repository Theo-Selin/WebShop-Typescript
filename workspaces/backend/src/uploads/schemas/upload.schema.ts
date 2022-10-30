import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type UploadDocument = Upload & Document;

@Schema({ timestamps: true })
export class Upload {
  @Transform(({ obj }) => obj._id.toString())
  _id: string;

  @Prop()
  originalname: string;

  @Prop()
  encoding: string;

  @Prop()
  mimetype: string;

  @Prop()
  filename: string;

  @Prop()
  path: string;

  @Prop()
  size: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Transform(({ obj }) => obj.uploadedBy.toString())
  uploadedBy: string;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
