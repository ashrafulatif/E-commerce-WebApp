import { Module } from '@nestjs/common';
import { ProductManagementService } from './product-management.service';
import { ProductManagementController } from './product-management.controller';
import { ProductManagement } from './entities/product-management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductManagement])],
  controllers: [ProductManagementController],
  providers: [ProductManagementService],
})
export class ProductManagementModule {}
