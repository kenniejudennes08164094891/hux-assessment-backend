import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtHelpersService } from '../jwt-helpers/jwt-helpers.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [AuthController],
  providers: [AuthService,JwtService, JwtHelpersService],
})
export class AuthModule {}
