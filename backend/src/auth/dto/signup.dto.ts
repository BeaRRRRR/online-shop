import { IsEnum, IsString, MinLength } from "class-validator";
import { ROLE } from "src/auth/enums/role";

export class SignUpDto {
  @IsString()
  @MinLength(5)
  username: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsEnum(ROLE)
  role: ROLE;
}
