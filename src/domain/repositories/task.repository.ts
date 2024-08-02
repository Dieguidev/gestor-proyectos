import { CreateTaskDto, TaskEntity } from "..";
import { GetTasksByProjectIdDto } from '../dtos/task/get-task-by-projectId.dto';

export abstract class TaskRepository {
  abstract createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>

  abstract getTasksByProjectId(getTasksByProjectIdDto: GetTasksByProjectIdDto): Promise<TaskEntity[]>

  // abstract getAllTasks(paginationDto: PaginationDto): Promise<TasksEntitiesWithPagination>

  // abstract getTaskById(getByIdTaskDto: GetByIdTaskDto): Promise<TaskEntity>

  // abstract updateTask(updateTaskDto : UpdateTaskDto): Promise<TaskEntity>;

  // abstract deleteTask(deleteTaskDto: DeleteTaskDto): Promise<TaskEntity>;
}
