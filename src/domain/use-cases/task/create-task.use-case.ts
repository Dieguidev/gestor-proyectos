import { CreateTaskDto, TaskRepository } from "../..";

interface Task {
  id: string;
  name: string;
  description: string;
  projectId: string;
  status: string;
}

interface CreateTaskUseCase {
  execute(createTaskDto: CreateTaskDto): Promise<Task>
}

export class CreateTask implements CreateTaskUseCase {

  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }

  async execute(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDto);

    return {
      id: task.id,
      name: task.name,
      description: task.description,
      projectId: task.projectId,
      status: task.status,
    }
  }
}
