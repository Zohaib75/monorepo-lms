import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from "../../common/enums/role.enum";

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
  defaultPassword: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 'user' })
  roles: [Role];
}

export const UserSchema = SchemaFactory.createForClass(User);
