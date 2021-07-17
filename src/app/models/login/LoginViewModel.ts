export class LoginViewModel{
  username: string | null = null;
  password: string | null = null;

  public isValid(): boolean {
    return this.username !== null && this.password !== null;
  }
}
