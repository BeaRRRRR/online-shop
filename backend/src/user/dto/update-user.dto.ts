import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  deposit: number
}
