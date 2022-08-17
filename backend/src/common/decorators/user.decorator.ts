import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ROLE } from 'src/auth/enums/role';

export type User = {
  id: string,
  role: ROLE,
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as { id: string, role: ROLE };
  },
);
