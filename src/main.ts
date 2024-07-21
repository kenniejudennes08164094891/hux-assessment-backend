import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  //Swagger documentations here
  const config = new DocumentBuilder()
    .setTitle('Hux-assessment-backend')
    .setDescription('API documentation for Hux developer test')
    .setVersion('1.0')
    .addTag('Created by Omosehin Kehinde Jude')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Enable CORS with specific options
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // enable credentials (cookies, authorization headers)
  }));

  await app.listen(3000);
  app.enableCors();
}
bootstrap();
