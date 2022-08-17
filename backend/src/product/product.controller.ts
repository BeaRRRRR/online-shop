import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { ROLE } from 'src/auth/enums/role';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Put } from '@nestjs/common';

@Controller('product')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(ROLE.SELLER)
  create(@Body() createProductDto: CreateProductDto, @User() user: User) {
    return this.productService.create(createProductDto, user.id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id/buy')
  @Roles(ROLE.BUYER)
  buy(@Param('id') id: string, @User() user: User) {
    return this.productService.buy(id, user.id);
  }

  @Patch(':id')
  @Roles(ROLE.SELLER)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @User() user: User) {
    return this.productService.update(id, updateProductDto, user.id);
  }

  @Delete(':id')
  @Roles(ROLE.SELLER)
  remove(@Param('id') id: string, @User() user: User) {
    return this.productService.remove(id, user.id);
  }
}
