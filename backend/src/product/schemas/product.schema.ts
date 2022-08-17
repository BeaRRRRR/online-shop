import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  amountAvailable: number;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true})
  productName: string;

  @Prop({
    required: true,
    type: String,
    ref: 'User',
  })
  sellerId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
