import { Controller,Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Login Controller')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('v1/auth/signin')
  @ApiOperation({ summary: "Authenticate User" })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post("v1/auth/logout-user")
  @ApiOperation({ summary: "Logout user from the application"})
  async logout(): Promise<any>{
    const presentTime = new Date();
    const options: any = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    this.authService.logoutUser();
    const logoutResponse = {
      message:"You've been logged out successfully",
      time:  presentTime.toLocaleString('en-US', options)?.toString()
    }
    return logoutResponse;
  }


}
