import { CreateTaskDto, TaskDataSource, TaskEntity, TaskRepository } from "../../domain";

export class TaskRepositoryImpl implements TaskRepository {

  constructor(
    private readonly taskDatasource: TaskDataSource,
  ) {}

  createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskDatasource.createTask(createTaskDto);
  }
}
