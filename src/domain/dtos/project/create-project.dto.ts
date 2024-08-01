

export class CreateProjectDto {

  private constructor(
    public projectName: string,
    public clientName: string,
    public description: string,
  ){}

  static create(object: { [key: string]: any }): [string?, CreateProjectDto?] {
    const { projectName, clientName, description } = object;

    if (!projectName) return ['Missing projectName'];
    if (!clientName) return ['Missing clientName'];
    if (!description) return ['Missing description'];

    return [undefined, new CreateProjectDto(projectName, clientName, description)]
  }
}
