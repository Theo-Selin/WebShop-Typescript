import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './schemas/upload.schema';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get('UPLOADS_DESTINATION'),
          filename: (_req: any, file: any, cb: any) => {
            cb(null, `${uuid()}.${file.originalname.split('.').slice(-1)[0]}`);
          },
        }),
      }),
    }),
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
