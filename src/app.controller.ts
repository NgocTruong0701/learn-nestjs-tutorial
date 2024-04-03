import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthJwtGuard } from './auth/auth.guard';
import { Public } from './common/decorator/useAuthJwt';
import { Role } from './common/enum/role.enum';
import { Roles } from './common/decorator/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request,
  ){
    return request.user;
  }

  @Get('profile2')
  // @UseGuards(AuthJwtGuard)
  @Roles(Role.User)
  getProfile2(
    @Req()
    request,
  ){
    return request.user;
  }
}
