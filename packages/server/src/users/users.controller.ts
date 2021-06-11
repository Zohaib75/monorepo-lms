import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto';

import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }
}
