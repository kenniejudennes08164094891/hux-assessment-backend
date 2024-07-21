import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { secret } from 'src/utils/secret/secret.interface';
import { JwtHelpersService } from 'src/jwt-helpers/jwt-helpers.service';

@Injectable()
export class JwtGuard implements CanActivate {

  logger: Logger;
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtHelper: JwtHelpersService
    ){
    this.logger = new Logger(JwtGuard?.name);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context?.switchToHttp()?.getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Using "Bearer <token>" format
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }else{
      try {
        const decoded = this.jwtService.verify(token, { secret: `${secret}` });
        request.user = decoded;
        this.jwtHelper.setActiveJWT(token);
        if(this.jwtHelper.isBlacklisted(token)){
          throw new UnauthorizedException('Invalid Token Validation...Please login again');
        }
        return true;
      } catch (error) {
          this.logger.error("error>>", error);
        // throw new UnauthorizedException('Invalid token');
        throw new HttpException("Token is invalid", HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
