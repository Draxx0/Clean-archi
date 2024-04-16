import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../domain/entity/user.entity';
import { UserRepositoryInterface } from '../domain/port/user.repository.interface';

export default class UserRepository
  extends Repository<User>
  implements UserRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async saveUser(user: User): Promise<User> {
    const queryBuilder = this.createQueryBuilder('user');

    queryBuilder.insert().values(user).execute();

    return user;
  }
}
