import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DepositDto } from './dto/deposit.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ROLE } from 'src/auth/enums/role';
import { ForbiddenException } from '@nestjs/common';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: User) {
    if(id !== user.id) throw new ForbiddenException(`This user doesn't belong to you`)
    return this.userService.findOne(id);
  }

  @Patch('reset')
  resetDeposit(@User() user: User) {
    return this.userService.resetDeposit(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @User() user: User) {
    if(id !== user.id) throw new ForbiddenException(`This user doesn't belong to you`)
    return this.userService.update(id, updateUserDto);
  }

  @Post('deposit')
  @Roles(ROLE.BUYER)
  deposit(@Body() depositDto: DepositDto, @User() user: User) {
    return this.userService.deposit(depositDto, user.id);
  } 

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: User) {
    if(id !== user.id) throw new ForbiddenException(`This user doesn't belong to you`)
    return this.userService.remove(id);
  }
}
