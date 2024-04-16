import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../domain/use-case/create-user.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.createUserService.createUser(body);
  }
}
