import { Model } from 'mongoose';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(this.configService.get('SALTROUND')),
    );

    createUserDto.password = hashedPassword;
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDto[]> {
    return this.userModel.find();
  }

  async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserDto> {
    try {
      const user = await this.findByEmail(email);
      await this.verifyPassword(password, user.password);
      return user;
    } catch (error) {
      throw error || new NotFoundException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw new HttpException('Password not matched.', HttpStatus.BAD_REQUEST);
    }
  }
}
