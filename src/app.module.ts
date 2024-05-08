import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './config/database';
import { UsersModule } from './app/users/users.module';
// import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './app/category/category.module';
import { ProductsModule } from './app/products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot(DBConfig), UsersModule, CategoryModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
