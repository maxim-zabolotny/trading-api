import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { PaymentsModule } from './payments/payments.module';
import { join } from "path";
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailModule } from './mail/mail.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    UsersModule,
    PaymentsModule,
    AuthModule,
    FilesModule,
    MailModule,
  ],
})
export class AppModule {
}
