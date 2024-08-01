export class ProjectEntity {
  constructor(
    public id: string,
    public projectName: string,
    public clientName: string,
    public description: string,
  ) {}

}


export class ProjectsEntitiesWithPagination {
  constructor(
    public page: number,
    public limit: number,
    public total: number,
    public next: string | null,
    public prev: string | null,
    public projects: ProjectEntity[],
  ) {}

}
