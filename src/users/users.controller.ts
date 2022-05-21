import {
  Body,
  Controller,
  Get,
  Patch,
  Post, UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from './entities';
import { JwtAuthGuard } from 'src/common/guards/jwr.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, fileFilter } from 'src/utils/file-upload.utils';
import { diskStorage } from 'multer';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { SupportRequestDto } from './dtos/support-meesage.dto';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) {
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @AuthUser() user: User,
  ) {
    console.log(user);
    return this.userService.getProfile(user.id);
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

  @ApiOperation({ summary: 'Send message to support' })
  @UseGuards(JwtAuthGuard)
  @Post('support')
  @ApiConsumes('multipart/form-data')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/support',
        filename: editFileName,
      }),
      // fileFilter: fileFilter,
    }),
  )
  public async sendMessageSupport(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SupportRequestDto,
  ): Promise<void> {
    return await this.userService.sendMessageSupport(body, file);
  }

}
