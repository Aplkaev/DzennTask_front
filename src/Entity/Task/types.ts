interface ITask {
  id: string | null;
  title: string | null;
  status: string | null;
  priority: number | null;
  project_id: string | null;
  assigned_to_id: string | null;
  description: string | null;
}

export type { ITask }