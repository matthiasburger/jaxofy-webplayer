export class LoginRequestDto{

  constructor(model?: any) {
    this.username = model.username;
    this.password = model.password;
  }

  username: string;
  password: string;
}
