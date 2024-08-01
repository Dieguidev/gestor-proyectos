import { CreateProjectDto, DeleteProjectDto, GetByIdProjectDto, PaginationDto, ProjectDataSource, ProjectEntity, ProjectRepository, ProjectsEntitiesWithPagination, UpdateProjectDto } from "../../domain";



export class ProjectRepositoryImpl implements ProjectRepository {

  constructor(
    private readonly projectDatasource: ProjectDataSource,
  ) {}
  getProjectById(getByIdProjectDto: GetByIdProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.getProjectById(getByIdProjectDto);
  }
  getAllProjects(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination> {
    return this.projectDatasource.getAllProjects(paginationDto);
  }

  createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.createProject(createProjectDto);
  }

  updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.updateProject(updateProjectDto);
  }

  deleteProject(deleteProjectDto: DeleteProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.deleteProject(deleteProjectDto);
  }
}
