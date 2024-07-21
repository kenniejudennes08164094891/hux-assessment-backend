import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtHelpersService } from 'src/jwt-helpers/jwt-helpers.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Contact])
  ],
  controllers: [ContactController],
  providers: [ContactService, Contact, JwtGuard, JwtService, JwtHelpersService],
  exports:[ContactModule, Contact] //to be imported at the auth module
})
export class ContactModule {}
