import { CreateTaskDto, GetTasksByProjectIdDto, TaskDataSource, TaskEntity, TaskRepository } from "../../domain";

export class TaskRepositoryImpl implements TaskRepository {

  constructor(
    private readonly taskDatasource: TaskDataSource,
  ) {}
  getTasksByProjectId(getTasksByProjectIdDto: GetTasksByProjectIdDto): Promise<TaskEntity[]> {
    return this.taskDatasource.getTasksByProjectId(getTasksByProjectIdDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskDatasource.createTask(createTaskDto);
  }
}
