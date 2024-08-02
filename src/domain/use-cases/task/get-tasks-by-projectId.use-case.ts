import { GetTasksByProjectIdDto, TaskRepository } from "../..";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface GetTasksByProjectIdUseCase {
  execute(getTasksByProjectIdDto: GetTasksByProjectIdDto): Promise<Task[]>
}

export class GetTasksByProjectId implements GetTasksByProjectIdUseCase {

  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }

  async execute(getTasksByProjectIdDto: GetTasksByProjectIdDto): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasksByProjectId(getTasksByProjectIdDto);

    return tasks.map(task => ({
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
    }));
  }
}
