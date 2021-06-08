import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto';

import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }
}
