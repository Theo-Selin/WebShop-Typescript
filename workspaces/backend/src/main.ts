import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initProducts } from './utils/initProducts';

const port = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await initProducts();
  app.enableCors();
  await app.listen(port);
  console.log(`server is listening on port: ${port}`);
}
bootstrap();
