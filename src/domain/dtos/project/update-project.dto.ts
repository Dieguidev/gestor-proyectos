import { Validators } from "../../../config";


export class UpdateProjectDto {

  private constructor(
    public id: string,
    public projectName?: string,
    public clientName?: string,
    public description?: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, UpdateProjectDto?] {
    const { id, projectName, clientName, description } = object;

    if (!id) return ['Missing id'];
    if (!Validators.isMongoID(id)) return ['Invalid Id']
    if (!projectName) return ['Missing projectName'];
    if (!clientName) return ['Missing clientName'];
    if (!description) return ['Missing description'];

    return [undefined, new UpdateProjectDto(id, projectName, clientName, description)]
  }
}
