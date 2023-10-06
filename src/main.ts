import * as morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('apiAgenda');

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  app.enableCors(CORS);

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  await app.listen(port);

  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
