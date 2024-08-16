import { Document, startSession } from "mongoose";

import { TaskModel, ITask } from '../../data/mongodb/models/task.model';
import { CreateTaskDto, CustomError, DeleteTaskDto, GetTaskByIdDto, GetTasksByProjectIdDto, ProjectEntity, TaskEntity, UpdateTaskDto } from "../../domain";
import { IProject } from "../../data/mongodb";



export class TaskService {
  async createTask(createTaskDto: CreateTaskDto, project: any) {
    const session = await startSession();
    try {
      session.startTransaction();
      const task = new TaskModel(createTaskDto);
      project.tasks.push(task.id);

      // await Promise.all([task.save({ session }), project.save({ session })]);
      await task.save({ session });
      await project.save({ session });

      await session.commitTransaction();
      session.endSession();

      return {
        task: TaskEntity.fromJson(task)
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(`${error}`);

    }
  }


  async getTasksByProjectId(getTasksByProjectIdDto: GetTasksByProjectIdDto) {
    const { projectId } = getTasksByProjectIdDto;
    try {
      const tasks = await TaskModel.find({ projectId }).populate('projectId');

      return tasks.map((task: ITask) => TaskEntity.fromJson(task));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getTaskById(getTaskByIdDto: GetTaskByIdDto) {
    const { id, projectId } = getTaskByIdDto;
    try {
      const task = await TaskModel.findById(id);
      if (!task) {
        throw CustomError.notFound('Task not found');
      }
      if (task.projectId.toString() !== projectId) {
        throw CustomError.forbidden('You are not allowed to access this task');
      }
      return TaskEntity.fromJson(task);
    }
    catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async updateTask(updateTaskdto: UpdateTaskDto) {
    const { id, name, description } = updateTaskdto;
    try {
      if (name === undefined && description === undefined) {
        throw CustomError.badRequest('No data to update');
      }
      const task = await TaskModel.findByIdAndUpdate(id, { name, description }, { new: true });
      if (!task) {
        throw CustomError.notFound('Task not found');
      }

      return TaskEntity.fromJson(task);
    }
    catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async deleteTask(deleteTaskDto: DeleteTaskDto, project: any) {
    const session = await startSession();
    session.startTransaction();
    const { id, projectId } = deleteTaskDto;
    try {
      const task = await TaskModel.findById(id);
      if (!task) {
        throw CustomError.notFound('Task not found');
      }
      if (task.projectId.toString() !== projectId) {
        throw CustomError.forbidden('You are not allowed to access this task');
      }

      project.tasks = project.tasks.filter((taskId: string) => taskId?.toString() !== id);

      await task.deleteOne({ session });
      await project.save({ session });


      await session.commitTransaction();
      session.endSession();

      return TaskEntity.fromJson(task);
    }
    catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async updateTaskStatus(updateTaskdto: UpdateTaskDto) {
    const { id, status } = updateTaskdto;
    try {
      if (status === undefined) {
        throw CustomError.badRequest('No data to update');
      }
      const task = await TaskModel.findByIdAndUpdate(id, { status }, { new: true });
      if (!task) {
        throw CustomError.notFound('Task not found');
      }

      return TaskEntity.fromJson(task);
    }
    catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
