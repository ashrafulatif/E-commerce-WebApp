import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductManagementDto {
  @IsNotEmpty()
  @Length(2)
  @IsString()
  productName: string;
  @IsNotEmpty()
  @Length(2)
  @IsNumber()
  price: number;
  @IsNotEmpty()
  pDtdescription: string;
}
