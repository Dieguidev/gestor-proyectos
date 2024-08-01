import { TaskEntity } from "../../domain";

export class TaskMapper {
  static taskEntityFromObject(object: {[key: string]: any}): TaskEntity {
    const { id, _id, name, description, project, status } = object;

    if (!id || !_id) {
      throw new Error('Missing id');
    }
    if (!name) throw new Error('Missing taskName');
    if (!description) throw new Error('Missing description');
    if (!project) throw new Error('Missing project');

    return new TaskEntity(
      id || _id,
      name,
      description,
      project,
      status
    );
  }
}
