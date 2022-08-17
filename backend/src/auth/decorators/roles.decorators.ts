import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../enums/role';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
