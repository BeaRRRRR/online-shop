import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hash } from 'bcrypt';
import { IsString } from 'class-validator';
import { ROLE } from 'src/auth/enums/role';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ required: false, default: 0 })
  deposit: number;

  @Prop({ required: true })
  role: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (this: UserDocument, next) {
  if (this.password) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }

  next();
});
