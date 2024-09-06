import { ProductManagement } from 'src/product-management/entities/product-management.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('cart')
export class CartManagement {
  @PrimaryGeneratedColumn()
  cartId: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => ProductManagement, (product) => product.productId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: ProductManagement;

  @Column({ nullable: false })
  quantity: number;
}
