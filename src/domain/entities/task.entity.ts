

export class TaskEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public projectId: string,
    public status: string,
  ) {}
}
