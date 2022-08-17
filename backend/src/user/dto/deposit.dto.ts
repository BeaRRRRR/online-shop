import { IsInt } from "class-validator";

export class DepositDto {
  @IsInt()
  amount: number;
}
