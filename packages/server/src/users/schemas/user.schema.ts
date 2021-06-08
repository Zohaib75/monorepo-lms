import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 18 })
  leavesAllowed: number;

  @Prop({ default: true })
  defaultPassword: number;

  @Prop({ default: true })
  isActive: number;

  @Prop({ default: 'user' })
  roles: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
