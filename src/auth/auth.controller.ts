import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller, HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, LoginUserDto, RegisterUserDto } from './dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    description: 'Incorrect email or password',
    status: HttpStatus.BAD_REQUEST
  })
  public async loginUser(@Body() dto: LoginUserDto): Promise<AuthResponse> {
    return await this.authService.loginUser(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({
    description: 'Such email already exist',
    status: HttpStatus.CONFLICT
  })
  public async registerUser(
    @Body() dto: RegisterUserDto,
  ): Promise<boolean> {
    return !!await this.authService.registerUser(dto);
  }
}