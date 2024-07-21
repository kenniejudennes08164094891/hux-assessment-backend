import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Contact } from './contact/entities/contact.entity';
import { AuthModule } from './auth/auth.module';
import { JwtHelpersService } from './jwt-helpers/jwt-helpers.service';

@Module({
  imports: [
    ContactModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',  //127.0.0.1 or localhost
      port: 3306,
      username: 'root',
      password: 'J.j@2015',
      database: 'contact',  //schema name
      entities: [Contact], //entities,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtHelpersService],
})
export class AppModule {}

//NPM Libraries used
//Note: MySql was used because mongo DB Cluster creation at https://cloud.mongodb.com/v2 is now paid and no longer free.

//npm install --save @nestjs/typeorm typeorm mysql2 
//npm i --save class-validator class-transformer
//npm install --save @nestjs/swagger swagger-ui-express
//npm install --save-dev @types/bcrypt
//npm install --save @nestjs/passport passport passport-local passport-jwt --legacy-peer-deps
//npm i cors  
//npm i --save-dev @types/cors