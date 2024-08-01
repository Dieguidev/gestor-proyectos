import { CreateProjectDto, ProjectDataSource, ProjectEntity, ProjectRepository } from "../../domain";



export class ProjectRepositoryImpl implements ProjectRepository {

  constructor(
    private readonly projectDatasource: ProjectDataSource,
  ) {}
  getAllProjects(): Promise<ProjectEntity[]> {
    return this.projectDatasource.getAllProjects();
  }


  createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.createProject(createProjectDto);
  }



}
