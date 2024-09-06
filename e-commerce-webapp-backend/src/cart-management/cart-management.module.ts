import { Module } from '@nestjs/common';
import { CartManagementService } from './cart-management.service';
import { CartManagementController } from './cart-management.controller';
import { CartManagement } from './entities/cart-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductManagement } from 'src/product-management/entities/product-management.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartManagement, ProductManagement]),
    UserModule,
  ],
  controllers: [CartManagementController],
  providers: [CartManagementService],
})
export class CartManagementModule {}
