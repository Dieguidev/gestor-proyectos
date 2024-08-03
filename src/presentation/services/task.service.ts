import { ProjectModel } from "../../data/mongodb";
import { TaskModel } from "../../data/mongodb/models/task.model";
import { CreateTaskDto, CustomError, GetTasksByProjectIdDto, ProjectEntity, TaskEntity } from "../../domain";



export class TaskService {
  async createTask(createTaskDto: CreateTaskDto,project: any) {
    const { projectId } = createTaskDto;
    try {
      const task = new TaskModel(createTaskDto);
      project.tasks.push(task.id);

      await Promise.all([task.save(), project.save()]);

      return {
        task: TaskEntity.fromJson(task)
      };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async getTasksByProjectId(getTasksByProjectIdDto: GetTasksByProjectIdDto) {
    const { projectId } = getTasksByProjectIdDto;
    try {
      const project = await ProjectModel.findById(projectId);
      if (!project) {
        throw CustomError.notFound('Project not found');
      }

      const tasks = await TaskModel.find({ projectId }).populate('projectId');
      console.log(tasks);

      return tasks.map(task => TaskEntity.fromJson(task));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
