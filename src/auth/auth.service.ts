import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LogInDto } from "./dto/login.dto";
import { User } from "src/users/entities/user.entity";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    async login(loginDto: LogInDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOne(loginDto);

        const passwordMatched = await bcrypt.compare(loginDto.password, user.password);
        if (passwordMatched) {
            delete user.password;

            const payload = { email: user.email, sub: user.id };
            return {
                accessToken: this.jwtService.sign(payload),
            };
        } else {
            throw new UnauthorizedException("Password does not match");
        }
    }
}
