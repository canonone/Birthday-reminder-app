import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/createUser-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
      return { message: 'User added successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
