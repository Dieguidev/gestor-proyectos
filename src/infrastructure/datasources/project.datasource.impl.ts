
import { ProjectModel } from "../../data/mongodb";
import { CreateProjectDto, CustomError, PaginationDto, ProjectDataSource, ProjectEntity, ProjectsEntitiesWithPagination } from "../../domain";
import { ProjectMapper } from "../mappers/project.mapper";


export class ProjectDataSourceImpl implements ProjectDataSource {
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
