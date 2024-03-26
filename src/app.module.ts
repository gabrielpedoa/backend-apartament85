import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './config/database';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(DBConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
