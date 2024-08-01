
import { CreateProjectDto } from "../dtos/project/create-project.dto";
import { ProjectEntity } from "../entities/project.entity";


export abstract class ProjectRepository {
  abstract createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>

  abstract getAllProjects(): Promise<ProjectEntity[]>
}
