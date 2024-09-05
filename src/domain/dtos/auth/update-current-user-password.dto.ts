export class UpdateCurrentUserPasswordDto {
  private constructor(
    public currentPassword: string,
    public newPassword: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, UpdateCurrentUserPasswordDto?] {
    const { currentPassword, newPassword, passwordConfirmation } = object;

    if (!currentPassword) return ['El password actual es requerido'];
    if (!newPassword) return ['El nuevo password es requerido'];
    if (newPassword.length < 8) return ['El nuevo password debe tener al menos 8 caracteres'];
    if (!passwordConfirmation) return ['La confirmación del password es requerida'];
    if (newPassword !== passwordConfirmation) return ['Los passwords no coinciden'];

    return [undefined, new UpdateCurrentUserPasswordDto(currentPassword, newPassword)];
  }
}
