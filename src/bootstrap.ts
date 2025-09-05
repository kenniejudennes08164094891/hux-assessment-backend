import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Express } from 'express';
import * as cors from 'cors';

let server: Express;

export default async function bootstrap(): Promise<Express> {
  if (!server) {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.use(cors({ origin: '*', credentials: true }));
    await app.init();
    server = app.getHttpAdapter().getInstance();
  }
  return server;
}
