import { Validators } from "../../../config";

export class CreateTaskDto {
  private constructor(
    public name: string,
    public description: string,
    public project: string,
  ){}

  static create(object: { [key: string]: any }): [string?, CreateTaskDto?] {
    const { taskName, description, project } = object;

    if (!taskName) return ['Missing taskName'];
    if (!description) return ['Missing description'];
    if (!project) return ['Missing project id'];
    if (!Validators.isMongoID(project)) return ['Invalid Id']

    return [undefined, new CreateTaskDto(taskName, description, project)]
  }
}
