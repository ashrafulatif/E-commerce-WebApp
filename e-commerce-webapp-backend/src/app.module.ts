import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductManagementModule } from './product-management/product-management.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    AuthModule,
    ProductManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
