import { CreateTaskDto, GetTasksByProjectIdDto, TaskEntity } from "..";

export abstract class TaskDataSource {
  abstract createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>

  abstract getTasksByProjectId(getTasksByProjectIdDto: GetTasksByProjectIdDto): Promise<TaskEntity[]>

  // abstract getAllTasks(paginationDto: PaginationDto): Promise<TasksEntitiesWithPagination>

  // abstract getTaskById(getByIdTaskDto: GetByIdTaskDto): Promise<TaskEntity>

  // abstract updateTask(updateTaskDto : UpdateTaskDto): Promise<TaskEntity>;

  // abstract deleteTask(deleteTaskDto: DeleteTaskDto): Promise<TaskEntity>;
}
