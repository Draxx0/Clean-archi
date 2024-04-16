import * as bcrypt from 'bcrypt';
import { PasswordHasherInterface } from '../domain/port/passwor-hasher.interface';

export class PasswordHasherService implements PasswordHasherInterface {
  async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
