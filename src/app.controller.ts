import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiBody, ApiTags,ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './users/dto/create-user.dto';


@Controller()
@ApiTags('AUTHENTIFICATION')
export class AppController {

  constructor(private authService: AuthService) { }
  
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: CreateUserDto
  })
  @Post('auth/login')
  @ApiOperation ({ summary: 'Connexion à un compte utilisateur' })
  @ApiResponse ({ status:200, description:'Authentification réussie'})
  async login(@Request() req: any) {
    
    return this.authService.login(req.body);
    
  }

  
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateUserDto
  })
  @Get('profile')
  @ApiOperation ({ summary: 'Profil utilisateur' })
  getProfile(@Request() req) {
    return req.user;
  }
}
