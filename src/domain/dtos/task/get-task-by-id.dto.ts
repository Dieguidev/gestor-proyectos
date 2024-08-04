import { Validators } from "../../../config";

export class GetTasksByIdDto {
  private constructor(
    public projectId: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, GetTasksByIdDto?] {
    const { id } = object;

    if (!id) return ['Missing id'];
    if (!Validators.isMongoID(id)) return ['Invalid id']

    return [undefined, new GetTasksByIdDto(id)]
  }
}
