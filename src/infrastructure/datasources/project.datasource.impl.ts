
import { ProjectModel } from "../../data/mongodb";
import { CreateProjectDto, CustomError, ProjectDataSource, ProjectEntity } from "../../domain";
import { ProjectMapper } from "../mappers/project.mapper";


export class ProjectDataSourceImpl implements ProjectDataSource {
  async getAllProjects(): Promise<ProjectEntity[]> {
    const projects = await ProjectModel.find();
    return projects.map(project => ProjectMapper.projectEntityFromObject(project));
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
