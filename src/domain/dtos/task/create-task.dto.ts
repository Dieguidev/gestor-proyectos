import { Validators } from "../../../config";

export class CreateTaskDto {
  private constructor(
    public name: string,
    public description: string,
    public projectId: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateTaskDto?] {
    const { taskName, description, projectId } = object;

    if (!taskName) return ['Missing taskName'];
    if (!description) return ['Missing description'];
    if (!projectId) return ['Missing project id'];
    if (!Validators.isMongoID(projectId)) return ['Invalid Id']

    return [undefined, new CreateTaskDto(taskName, description, projectId)]
  }
}
