import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { compare, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UsersRepositoryService, UsersService } from 'src/users';
import { AuthResponse, LoginUserDto, RegisterUserDto } from './dtos';
import { Roles } from '../common/enums/roles.enum';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }

  public async loginUser(body: LoginUserDto): Promise<AuthResponse> {
    console.log(body);
    const { email, password } = body;
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });
    console.log(user);
    if (!user) {
      throw new HttpException('Incorrect email or password', HttpStatus.BAD_REQUEST);
    }

    const areEqual = await compare(String(password), user.password);
    if (!areEqual) {
      throw new HttpException('Incorrect email or password', HttpStatus.BAD_REQUEST);
    }

    delete user.password;
    const token = this.jwtService.sign({ ...user });

    return { user, token };
  }

  public async registerUser(body: RegisterUserDto): Promise<User> {
    let { email, password, firstName } = body;

    const toLowerEmail = email.toLowerCase();

    const findUser = await this.userRepository.findOne({
      email: email
    });

    if (findUser) {
      throw new HttpException(
        `Such email already exist`,
        HttpStatus.CONFLICT,
      );
    }

    password = hashSync(password, JSON.parse(this.configService.get('SALT')));
    const user = await this.userRepository.save({
      email: toLowerEmail,
      role: Roles.user,
      password,
      firstName,
    });

    return user
  }
}
