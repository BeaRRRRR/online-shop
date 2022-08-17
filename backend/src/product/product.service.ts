import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { UserService } from 'src/user/user.service';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    private readonly userService: UserService
  ) {}

  create(createProductDto: CreateProductDto, sellerId: string) {
    return this.productModel.create({...createProductDto, sellerId });
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: string) {
    return this.productModel.findById(id);
  }

  async buy(_id: string, buyerId: string) {
    const user = await this.userService.findOne(buyerId);
    if(!user) throw new Error(`This user doesn't exist`);

    const { amountAvailable, sellerId, cost } = await this.productModel.findOne({ _id }).orFail();
    if(amountAvailable < 1) throw new Error('Product is sold out');
    if(user.deposit < cost) throw new Error('Not enought money');

    await this.update(_id, { amountAvailable: amountAvailable - 1}, sellerId) 
    await this.userService.update(buyerId, { deposit: user.deposit - cost })
  } 

  async update(_id: string, updateProductDto: UpdateProductDto, sellerId: string) {
    await this.checkIfProductBelongsToSeller(_id, sellerId);
    return this.productModel.findOneAndUpdate({ _id }, updateProductDto, { new: true });
  }

  async remove(_id: string, sellerId: string) {
    await this.checkIfProductBelongsToSeller(_id, sellerId);
    return this.productModel.deleteOne({ _id}).orFail();
  }

  private async checkIfProductBelongsToSeller(_id: string, sellerId: string) {
    const product = await this.productModel.findOne({ _id }).orFail();
    if(product.sellerId !== sellerId) throw new Error(`This product doesn't belong to you`)
  }
}
