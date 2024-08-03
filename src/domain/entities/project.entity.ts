import { CustomError } from "../errors/custom.error";

export class ProjectEntity {
  constructor(
    public id: string,
    public projectName: string,
    public clientName: string,
    public description: string,
  ) { }

  static fromJson(object: { [key: string]: any }): ProjectEntity {
    const {
      id, _id,
      projectName,
      clientName,
      description } = object;

    if (!id && !_id) throw CustomError.badRequest('Missing ID');
    if (!projectName) throw CustomError.badRequest('Missing projectName');
    if (!clientName) throw CustomError.badRequest('Missing clientName');
    if (!description) throw CustomError.badRequest('Missing description');

    return new ProjectEntity(
      id || _id,
      projectName,
      clientName,
      description
    );
  }
}



