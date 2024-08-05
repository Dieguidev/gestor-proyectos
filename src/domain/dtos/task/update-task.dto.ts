import { Validators } from "../../../config";



export class UpdateTaskDto {
  private constructor(
    public id: string,
    public projectId: string,
    public name?: string,
    public description?: string
  ) { }

  static create(object: { [key: string]: any }): [string?, UpdateTaskDto?] {
    const { id, projectId, name, description } = object;

    if (!id) return ['Missing id'];
    if (!Validators.isMongoID(id)) return ['Invalid id'];
    if (!projectId) return ['Missing projectId'];
    if (!Validators.isMongoID(projectId)) return ['Invalid projectId'];

    return [undefined, new UpdateTaskDto(id, projectId, name, description)]
  }
}
