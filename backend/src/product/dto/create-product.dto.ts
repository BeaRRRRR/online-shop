import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  amountAvailable: number;

  @IsInt()
  cost: number;

  @IsString()
  productName: string;
}
