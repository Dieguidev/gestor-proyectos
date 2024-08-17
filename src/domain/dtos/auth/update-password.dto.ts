export class UpdatePasswordDto {
  private constructor(
    public password: string,
    public confirmPassword: string,
    public token: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, UpdatePasswordDto?] {
    const { password, confirmPassword, token } = object;

    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password must be at least 6 characters'];
    if (!confirmPassword) return ['Missing confirmPassword'];
    if (confirmPassword !== password) return ['Passwords do not match'];
    if (!token) return ['Missing token'];
    if (token.length !== 6) return ['Invalid token'];

    return [undefined, new UpdatePasswordDto(password, confirmPassword, token)];
  }
}
