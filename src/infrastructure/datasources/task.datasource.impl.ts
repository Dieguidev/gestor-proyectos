import { ProjectModel } from "../../data/mongodb";
import { TaskModel } from "../../data/mongodb/models/task.model";
import { CreateTaskDto, CustomError, TaskDataSource, TaskEntity } from "../../domain";
import { TaskMapper } from "../mappers/task.mapper";

export class TaskDataSourceImpl implements TaskDataSource {
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { projectId } = createTaskDto;
    try {
      const project = await ProjectModel.findById(projectId);
      if (!project) {
        throw CustomError.notFound('Task not found');
      }

      const task = new TaskModel(createTaskDto);
      await task.save();

      return TaskMapper.taskEntityFromObject(task);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  // deleteTask(taskId: string): Promise<void> {
  //   throw new Error("Method not implemented.");
  // }
  // getTask(taskId: string): Promise<TaskEntity> {
  //   throw new Error("Method not implemented.");
  // }
  // getTasks(projectId: string): Promise<TaskEntity[]> {
  //   throw new Error("Method not implemented.");
  // }
  // updateTask(taskId: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
  //   throw new Error("Method not implemented.");
  // }
}
