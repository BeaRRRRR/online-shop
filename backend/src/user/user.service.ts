import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { DepositDto } from './dto/deposit.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(_id: string) {
    return this.userModel.findOne({ _id });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id }, updateUserDto, { new: true }).orFail(); 
  }

  remove(_id: string) {
    return this.userModel.deleteOne({ _id }).orFail();
  }

  async deposit({ amount }: DepositDto, _id: string) {
    const { deposit: initialDeposit } = await this.userModel.findOne({ _id }).orFail();
    return this.userModel.findOneAndUpdate({ _id }, { deposit: initialDeposit + amount }, { new: true })
  }

  resetDeposit(_id: string) {
    return this.update(_id, { deposit: 0 })
  }
}
