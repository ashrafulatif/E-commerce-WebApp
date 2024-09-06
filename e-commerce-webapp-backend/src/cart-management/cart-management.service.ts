import { Injectable } from '@nestjs/common';
import { CreateCartManagementDto } from './dto/create-cart-management.dto';
import { CartManagement } from './entities/cart-management.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ProductManagement } from 'src/product-management/entities/product-management.entity';

@Injectable()
export class CartManagementService {
  constructor(
    @InjectRepository(CartManagement)
    private readonly cartRep: Repository<CartManagement>,

    @InjectRepository(User)
    private readonly userRep: Repository<User>,

    @InjectRepository(ProductManagement)
    private readonly productRep: Repository<ProductManagement>,
  ) {}

  // Add product to cart
  async create(createCartManagementDto: CreateCartManagementDto) {
    try {
      const { userId, productId, quantity } = createCartManagementDto;

      // Find the user and product by ID
      const user = await this.userRep.findOne({ where: { id: userId } });
      const product = await this.productRep.findOne({ where: { productId } });

      if (!user || !product) {
        return { message: 'User or product not found' };
      }

      // Create a cart item
      const cartItem = this.cartRep.create({
        user,
        product,
        quantity,
      });

      // Save the cart item
      const insertedProduct = await this.cartRep.save(cartItem);

      return {
        message: 'Product added to cart successfully',
        cart: insertedProduct,
      };
    } catch (error) {
      return { message: 'Failed to insert product into the cart' };
    }
  }

  async findAll() {
    return await this.cartRep.find({ relations: ['user', 'product'] });
  }

  async findOne(id: number) {
    return await this.cartRep.findOne({
      where: { cartId: id },
      relations: ['user', 'product'],
    });
  }

  async remove(id: number) {
    return await this.cartRep.delete(id);
  }
}
