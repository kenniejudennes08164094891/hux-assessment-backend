import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { Express } from 'express';

let server: Express;

export default async function bootstrap(): Promise<Express> {
  if (!server) {
    const app: INestApplication = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const config = new DocumentBuilder()
      .setTitle('Hux-assessment-backend')
      .setDescription('API documentation for Hux developer test')
      .setVersion('1.0')
      .addTag('Created by Omosehin Kehinde Jude')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    app.use(
      cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
      })
    );

    app.enableCors();

    await app.init();

    server = app.getHttpAdapter().getInstance(); // Express instance
  }

  return server;
}
