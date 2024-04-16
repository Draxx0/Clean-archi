export interface PasswordHasherInterface {
  hashPassword(password: string): Promise<string>;
}
