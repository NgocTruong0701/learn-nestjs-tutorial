import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/useAuthJwt';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) { }

    @Public()
    @Post('signup')
    signup(@Body() userDto: CreateUserDto): Promise<User> {
        return this.userService.create(userDto);
    }

    @Public()
    @Post('login')
    login(@Body() loginDto: LogInDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto)
    }

    @Post('login-new')
    @Public()
    loginNew(@Body() loginDto: LogInDto): Promise<{ access_token: string }> {
        return this.authService.loginNew(loginDto)
    }
}
