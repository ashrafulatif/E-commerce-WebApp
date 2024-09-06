import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductManagementDto } from './dto/create-product-management.dto';
import { UpdateProductManagementDto } from './dto/update-product-management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductManagement } from './entities/product-management.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductManagementService {
  constructor(
    @InjectRepository(ProductManagement)
    private readonly productRep: Repository<ProductManagement>,
  ) {}
  async create(createProductManagementDto: CreateProductManagementDto) {
    try {
      const productItem = await this.productRep.create(
        createProductManagementDto,
      );
      const insertedProduct = await this.productRep.save(productItem);
      return {
        message: 'product inserted successfully',
        purchase: insertedProduct,
      };
    } catch (error) {
      return { message: 'Failed to insert product' };
    }
  }

  async findAll() {
    return await this.productRep.find();
  }

  async findOne(id: number) {
    return await this.productRep.findOne({ where: { productId: id } });
  }

  async update(
    id: number,
    updateProductManagementDto: UpdateProductManagementDto,
  ) {
    //check value in the db
    const existingProduct = await this.productRep.findOne({
      where: { productId: id },
    });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(existingProduct, updateProductManagementDto);

    await this.productRep.save(existingProduct);
    //retriveing updated product info
    const updatedProduct = await this.productRep.findOne({
      where: { productId: id },
    });

    return {
      message: 'Update successful',
      product: updatedProduct,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} productManagement`;
  }
}
