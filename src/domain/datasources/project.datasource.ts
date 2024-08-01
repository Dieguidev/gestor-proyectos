import { CreateProjectDto, ProjectEntity } from "..";



export abstract class ProjectDataSource {
  abstract createProject(creaProjectDto: CreateProjectDto): Promise<ProjectEntity>;

  abstract getAllProjects(): Promise<ProjectEntity[]>;
}
