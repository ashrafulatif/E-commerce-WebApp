import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartManagementService } from './cart-management.service';
import { CreateCartManagementDto } from './dto/create-cart-management.dto';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('cart-management')
export class CartManagementController {
  constructor(private readonly cartManagementService: CartManagementService) {}

  @Post('add-product-cart')
  async create(@Body() createCartManagementDto: CreateCartManagementDto) {
    return await this.cartManagementService.create(createCartManagementDto);
  }

  @Get('find-all')
  async findAll() {
    return await this.cartManagementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartManagementService.findOne(+id);
  }

  @Delete('remove-cart/:id')
  async remove(@Param('id') id: string) {
    return await this.cartManagementService.remove(+id);
  }
}
