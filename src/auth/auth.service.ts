import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { compare, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users';
import { AuthResponse, LoginUserDto, RegisterUserDto } from './dtos';
import { Roles } from '../common/enums/roles.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  public async loginUser(body: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = body;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('There is no such user', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(String(password), user.password);
    if (!areEqual) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    delete user.password;
    const token = this.jwtService.sign({ ...user });

    return { user, token };
  }

  public async registerUser(body: RegisterUserDto): Promise<HttpException> {
    let { email, password } = body;

    const toLowerEmail = email.toLowerCase();

    const findUser = await this.userService.findByEmail(email);

    if (findUser) {
      throw new HttpException(
        `User email or login already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    password = hashSync(password, JSON.parse(this.configService.get('SALT')));

    const user = await this.userService.createUser({
      email: toLowerEmail,
      role: Roles.user,
      password
    });

    return new HttpException(
      'To complete registration, you need to confirm your email',
      HttpStatus.OK,
    );
  }
}
