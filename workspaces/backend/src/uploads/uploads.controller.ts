import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { JwtPayload } from 'src/users/users.controller';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { Upload } from './schemas/upload.schema';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Roles(Role.Admin)
  @Post('')
  @UseInterceptors(
    MongooseClassSerializerInterceptor({ defaultClass: Upload }),
    FilesInterceptor('files'),
  )
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
  ) {
    const { userId } = req.user as JwtPayload;
    return await this.uploadService.createMany(userId, files);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async removeFile(@Param('id') id: string) {
    return await this.uploadService.remove(id);
  }
}
