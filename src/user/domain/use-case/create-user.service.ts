import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { PasswordHasherInterface } from '../port/passwor-hasher.interface';
import { UserRepositoryInterface } from '../port/user.repository.interface';

export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private passwordHasher: PasswordHasherInterface,
  ) {}

  async createUser(body: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordHasher.hashPassword(
      body.password,
    );

    const user = new User(
      body.firstName,
      body.lastName,
      body.email,
      hashedPassword,
    );

    return await this.userRepository.saveUser(user);
  }
}
