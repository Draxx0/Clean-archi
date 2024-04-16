import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { CreateUserService } from './domain/use-case/create-user.service';
import { PasswordHasherService } from './infrastructure/password-haser.service';
import { UserRepositoryInterface } from './domain/port/user.repository.interface';
import { PasswordHasherInterface } from './domain/port/passwor-hasher.interface';
import UserRepository from './infrastructure/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'PasswordHasherInterface',
      useClass: PasswordHasherService,
    },

    {
      provide: CreateUserService,
      useFactory: (
        userRepository: UserRepositoryInterface,
        passwordHasher: PasswordHasherInterface,
      ) => new CreateUserService(userRepository, passwordHasher),
      inject: ['UserRepositoryInterface'],
    },
  ],
})
export class UserModule {}
