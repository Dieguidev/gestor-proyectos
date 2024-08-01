import { CreateTaskDto, TaskEntity } from "..";

export abstract class TaskRepository {
  abstract createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>

  // abstract getAllTasks(paginationDto: PaginationDto): Promise<TasksEntitiesWithPagination>

  // abstract getTaskById(getByIdTaskDto: GetByIdTaskDto): Promise<TaskEntity>

  // abstract updateTask(updateTaskDto : UpdateTaskDto): Promise<TaskEntity>;

  // abstract deleteTask(deleteTaskDto: DeleteTaskDto): Promise<TaskEntity>;
}
