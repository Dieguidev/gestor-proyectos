import { ProjectEntity } from "../../domain";


export class ProjectMapper {

  static projectEntityFromObject(object: {[key: string]: any}): ProjectEntity {
    const { id, _id, projectName, clientName, description } = object;

    if (!id || !_id) {
      throw new Error('Missing id');
    }
    if (!projectName) throw new Error('Missing projectName');
    if (!clientName) throw new Error('Missing clientName');
    if (!description) throw new Error('Missing description');

    return new ProjectEntity(
      id || _id,
      projectName,
      clientName,
      description
    );
  }

}
