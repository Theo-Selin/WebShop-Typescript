import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { initProducts } from './utils/initProducts';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = 4000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // await initProducts();
  app.enableCors();
  await app.listen(port);
  console.log(`server is listening on port: ${port}`);
}
bootstrap();
