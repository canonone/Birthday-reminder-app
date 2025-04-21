import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join('__dirname', '..', 'public'));
  app.enableCors();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`the server is runnig on port:${PORT}`);
  });
}
bootstrap();
