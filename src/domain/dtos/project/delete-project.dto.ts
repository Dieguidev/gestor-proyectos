import { Validators } from "../../../config";


export class DeleteProjectDto {

  private constructor(
    public id: string,
  ){}

  static create(object: { [key: string]: any }): [string?, DeleteProjectDto?] {
    const { id } = object;

    if (!id) return ['Missing id'];
    if (!Validators.isMongoID(id)) return ['Invalid Id']

    return [undefined, new DeleteProjectDto(id)]
  }
}
