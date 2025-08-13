export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TaskData {
  limit: number;
  page: number;
  total: number;
  data: Task[];
}
