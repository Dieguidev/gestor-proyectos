import { TaskEntity } from "../../domain";

export class TaskMapper {
  static taskEntityFromObject(object: {[key: string]: any}): TaskEntity {
    const { id, _id, name, description, projectId, status } = object;

    if (!id || !_id) {
      throw new Error('Missing id');
    }
    if (!name) throw new Error('Missing taskName');
    if (!description) throw new Error('Missing description');
    if (!projectId) throw new Error('Missing projectId');

    return new TaskEntity(
      id || _id,
      name,
      description,
      projectId,
      status
    );
  }
}
