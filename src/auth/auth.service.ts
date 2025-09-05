import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { secret } from '../utils/secret/secret.interface';
import * as bcrypt from 'bcrypt';   //for hashing passwords     npm install bcrypt
import * as jwt from 'jsonwebtoken';
import { JwtHelpersService } from '../jwt-helpers/jwt-helpers.service';

@Injectable()
export class AuthService {

  private logger: Logger;
  private jwtSecret: any = `${secret}`;
  constructor(
    private jwtService: JwtService,
    private jwtHelpers: JwtHelpersService
  ) {
    this.logger = new Logger(AuthService.name);
  }

 async create(createAuthDto: CreateAuthDto): Promise<any>{
    const expiresIn = 3600; // 1 hour in seconds
    const jwtRegister = jwt.sign(createAuthDto, this.jwtSecret, { expiresIn });

    const presentTime = new Date();
    const options: any = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

    const successMessage: any = {
      message: "user is loggedIn successfully!",
      details: {
        access_token: jwtRegister,
        loggedInAt: presentTime.toLocaleString('en-US', options)?.toString(),
        email: createAuthDto?.email,
        password: await bcrypt.hash(createAuthDto?.password, 10)
      }
    }

    return successMessage;
  }

  logoutUser() {
    this.jwtHelpers.getActiveJWT().subscribe({
      next: async (jwt: any): Promise<any> => {
        this.jwtHelpers.addToBlacklist(jwt);   //To invalidate the JWT;;
      },
      error: (err: any) => {
        this.logger.error("err>>>", err);
      }
    }).unsubscribe();
  }

}
