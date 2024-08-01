
import { ProjectModel } from "../../data/mongodb";
import { CreateProjectDto, CustomError, DeleteProjectDto, GetByIdProjectDto, PaginationDto, ProjectDataSource, ProjectEntity, ProjectsEntitiesWithPagination, UpdateProjectDto } from "../../domain";
import { ProjectMapper } from "../mappers/project.mapper";


export class ProjectDataSourceImpl implements ProjectDataSource {
  async updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    const { id, ...rest } = updateProjectDto
    try {
      if (!id || !rest) {
        throw CustomError.badRequest('Invalid update data');
      }
      const project = await ProjectModel.findByIdAndUpdate(id, rest, { new: true });

      if (!project) {
        throw CustomError.notFound('Project not found');
      }

      return ProjectMapper.projectEntityFromObject(project);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async deleteProject(deleteProjectDto: DeleteProjectDto): Promise<ProjectEntity> {
    const {id} = deleteProjectDto;
    try {
      const project = await ProjectModel.findByIdAndDelete(id);
      if (!project) {
        throw CustomError.notFound('Project not found');
      }

      return ProjectMapper.projectEntityFromObject(project);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }

  }


  async getProjectById(getByIdProjectDto: GetByIdProjectDto): Promise<ProjectEntity> {
    const { id } = getByIdProjectDto;
    try {
      const project = await ProjectModel.findById(id);
      if (!project) {
        throw CustomError.notFound('Project not found');
      }

      return ProjectMapper.projectEntityFromObject(project);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async getAllProjects(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, projects] = await Promise.all([
        ProjectModel.countDocuments(),
        ProjectModel.find()
          .skip(skip)
          .limit(limit)
      ])

      const listProjects = projects.map(project => ProjectMapper.projectEntityFromObject(project));

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


  async createProject(creaProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const { projectName, clientName, description } = creaProjectDto;

    try {
      const project = new ProjectModel({ projectName, clientName, description });

      await project.save();

      return ProjectMapper.projectEntityFromObject(project);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

}
