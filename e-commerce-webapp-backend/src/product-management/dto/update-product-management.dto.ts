import { PartialType } from '@nestjs/swagger';
import { CreateProductManagementDto } from './create-product-management.dto';

export class UpdateProductManagementDto extends PartialType(CreateProductManagementDto) {}
