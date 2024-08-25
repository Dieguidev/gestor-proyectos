import { Validators } from "../../../config";


export class AddTeamMemberDto {
  private constructor(
    public email: string
  ) { }

  static create(object: { [key: string]: any }): [string?, AddTeamMemberDto?] {
    const { email } = object;

    if (!email) return ['Missing email'];
    if (!Validators.email.test(email)) return ['Invalid email']



    return [undefined, new AddTeamMemberDto(email)]
  }
}
