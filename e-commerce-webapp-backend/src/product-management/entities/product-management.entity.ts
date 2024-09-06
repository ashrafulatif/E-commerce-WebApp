import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductManagement {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ unique: true, nullable: false })
  price: number;

  @Column({ nullable: false })
  pDtdescription: string;
}
