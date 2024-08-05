import { Validators } from "../../../config";
import { CustomError } from "../../errors/custom.error";



export class UpdateTaskDto {
  private constructor(
    public id: string,
    public name?: string,
    public description?: string,
    public status?: string
  ) { }

  static create(object: { [key: string]: any }): [string?, UpdateTaskDto?] {
    const { id, name, description, status } = object;

    if (!id) return ['Missing id'];
    if (!Validators.isMongoID(id)) return ['Invalid id'];
    if (name && typeof name !== 'string') return ['Invalid name'];

    return [undefined, new UpdateTaskDto(id, name, description, status)]
  }
}
