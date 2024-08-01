import { CreateProjectDto, PaginationDto, ProjectDataSource, ProjectEntity, ProjectRepository, ProjectsEntitiesWithPagination } from "../../domain";



export class ProjectRepositoryImpl implements ProjectRepository {

  constructor(
    private readonly projectDatasource: ProjectDataSource,
  ) {}
  getAllProjects(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination> {
    return this.projectDatasource.getAllProjects(paginationDto);
  }


  createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.createProject(createProjectDto);
  }



}
