// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as cors from 'cors';


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true
//     })
//   );

//   //Swagger documentations here
//   const config = new DocumentBuilder()
//     .setTitle('Hux-assessment-backend')
//     .setDescription('API documentation for Hux developer test')
//     .setVersion('1.0')
//     .addTag('Created by Omosehin Kehinde Jude')
//     .addBearerAuth()
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api-docs', app, document);

//   // Enable CORS with specific options
//   app.use(cors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,  // enable credentials (cookies, authorization headers)
//   }));

//   await app.listen(3000);
//   app.enableCors();
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { INestApplication } from '@nestjs/common';
import { Express } from 'express';

let server: Express;

async function bootstrap(): Promise<Express> {
  if (!server) {
    const app = await NestFactory.create<INestApplication>(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

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
        credentials: true,
      }),
    );
    app.enableCors();

    await app.init();

    // 👇 this gives us the raw Express instance, which is callable (req,res)
    server = app.getHttpAdapter().getInstance();
  }
  return server;
}

export default bootstrap;
