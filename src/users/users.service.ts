import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcryptjs';
import { LogInDto } from 'src/auth/dto/login.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(userDto: CreateUserDto): Promise<User> {
    const salt = await bycrypt.genSalt();
    userDto.password = await bycrypt.hash(userDto.password, salt);

    const user = await this.userRepository.save(userDto);
    delete user.password;
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(loginDto: LogInDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
