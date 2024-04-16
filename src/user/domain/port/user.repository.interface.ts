import { User } from '../entity/user.entity';

export interface UserRepositoryInterface {
  saveUser(user: User): Promise<User>;
}
