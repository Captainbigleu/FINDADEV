import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users/dto/create-user.dto';


@Controller()
@ApiTags('Authentification')
export class AppController {

  constructor(private authService: AuthService) { }
  
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: CreateUserDto
  })
  @Post('auth/login')
  async login(@Request() req: any) {
    console.log(req);
    
    return this.authService.login(req.body);
    
  }

  
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateUserDto
  })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
