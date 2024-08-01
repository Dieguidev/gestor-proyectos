import { CreateProjectDto, ProjectDataSource, ProjectEntity, ProjectRepository } from "../../domain";



export class ProjectRepositoryImpl implements ProjectRepository {

  constructor(
    private readonly projectDatasource: ProjectDataSource,
  ) {}


  createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.createProject(createProjectDto);
  }

  getAllProjects(): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
