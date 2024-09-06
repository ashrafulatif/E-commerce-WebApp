import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByuserEmail(email);
    if (!user) {
      console.log('not found');
      throw new BadRequestException();
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong password');
    }
    return user;
  }
  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        firstName: user.firstName,
      },
    };
    return {
      message: 'login successful',
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
