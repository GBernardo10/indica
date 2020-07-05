import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import compress from 'compression';
import cors from 'cors';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      unset: 'destroy',
      secret: 'secret',
      cookie: {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    }),
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  app.use(compress({}));

  app.use(cookieParser());
  app.disable('x-powered-by');
  app.use(cors());

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('API AUTH')
      .setDescription('API AUTH')
      .build(),
  );

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
