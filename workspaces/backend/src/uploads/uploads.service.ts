import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from './schemas/upload.schema';
import * as fs from 'fs/promises';
import { join, sep } from 'path';

@Injectable()
export class UploadsService {
  constructor(
    @InjectModel(Upload.name)
    private readonly uploadModel: Model<UploadDocument>,
  ) {}

  private readonly logger = new Logger(UploadsService.name);

  createMany(userId: string, files: Express.Multer.File[]) {
    const newFiles = files.map((file) => {
      const { originalname, encoding, mimetype, filename, path, size } = file;
      return {
        originalname,
        encoding,
        mimetype,
        filename,
        path: path.split(sep).slice(1).join('/'),
        size,
        uploadedBy: userId,
      };
    });
    return this.uploadModel.create(...newFiles);
  }

  async remove(uploadId: string) {
    try {
      const removedFile = await this.uploadModel.findByIdAndDelete(uploadId);
      await fs.unlink(join('public', removedFile.path));
      return removedFile;
    } catch (e) {
      this.logger.error(e);
      throw new NotFoundException();
    }
  }
}
