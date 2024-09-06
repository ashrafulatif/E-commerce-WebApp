import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductManagementService } from './product-management.service';
import { CreateProductManagementDto } from './dto/create-product-management.dto';
import { UpdateProductManagementDto } from './dto/update-product-management.dto';

@Controller('product-management')
export class ProductManagementController {
  constructor(
    private readonly productManagementService: ProductManagementService,
  ) {}

  @Post('add-product')
  create(@Body() createProductManagementDto: CreateProductManagementDto) {
    return this.productManagementService.create(createProductManagementDto);
  }

  @Get()
  findAll() {
    return this.productManagementService.findAll();
  }

  @Get('find-product/:id')
  findOne(@Param('id') id: string) {
    return this.productManagementService.findOne(+id);
  }

  @Patch('modify-product/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductManagementDto: UpdateProductManagementDto,
  ) {
    return this.productManagementService.update(
      +id,
      updateProductManagementDto,
    );
  }

  @Delete('remove-product/:id')
  remove(@Param('id') id: string) {
    return this.productManagementService.remove(+id);
  }
}
