import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from './entities';
import { JwtAuthGuard } from 'src/common/guards/jwr.guard';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @AuthUser() user: User,
  ) {
    console.log(user);
    return this.userService.getProfile(user.id)
  }

  @ApiOperation({ summary: 'Change password' })
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async changePassword(
    @Body() body: ChangePasswordDto,
    @AuthUser() user: User,
  ): Promise<any> {
    return this.userService.changePassword(user.id, body);
  }
}
