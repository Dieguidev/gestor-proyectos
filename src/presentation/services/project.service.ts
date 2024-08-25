import { IProject, ProjectModel } from "../../data/mongodb";
import { CreateProjectDto, CustomError, DeleteProjectDto, GetByIdProjectDto, PaginationDto, ProjectEntity, UpdateProjectDto } from "../../domain";

export class ProjectService {
  async createProject(creaProjectDto: CreateProjectDto) {
    try {
      const project = new ProjectModel(creaProjectDto);

      await project.save();

      return { project: ProjectEntity.fromJson(project) };

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async getAllProjects(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, projects] = await Promise.all([
        ProjectModel.countDocuments(),
        ProjectModel.find()
          .skip(skip)
          .limit(limit)
      ])

      const listProjects: ProjectEntity[] = projects.map((project: IProject) => ProjectEntity.fromJson(project));

      return {
        page,
        limit,
        total: total,
        next: (total - (page * limit)) > 0 ? `/api/categories?page=${page + 1}&limit=${limit}` : null,
        prev: (page - 1 > 0) ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        projects: listProjects
      }

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async getProjectById(getByIdProjectDto: GetByIdProjectDto){
    const { id } = getByIdProjectDto;
    try {
      const project = await ProjectModel.findById(id).populate('tasks').exec();
      if (!project) {
        throw CustomError.notFound('Project not found');
      }




      return {project: ProjectEntity.fromJson(project)};
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async deleteProject(deleteProjectDto: DeleteProjectDto) {
    const {id} = deleteProjectDto;
    try {
      const project = await ProjectModel.findByIdAndDelete(id);
      if (!project) {
        throw CustomError.notFound('Project not found');
      }

      return 'Project deleted';
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async updateProject(updateProjectDto: UpdateProjectDto) {
    const { id, ...rest } = updateProjectDto
    try {
      if (!id || !rest) {
        throw CustomError.badRequest('Invalid update data');
      }
      const project = await ProjectModel.findByIdAndUpdate(id, rest, { new: true });

      if (!project) {
        throw CustomError.notFound('Project not found');
      }

      return {project: ProjectEntity.fromJson(project)};
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
