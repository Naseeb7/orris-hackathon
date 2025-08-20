export type TimeLogType = {
  _id: string;
  taskId: { _id: string; title: string; project: string };
  hours: number;
  date: Date;
};

export type DashboardLog = {
  _id: string;
  taskId: {
    _id: string;
    title: string;
    project: string;
  };
  hours: number;
  date: string;
};

export type Task = {
  _id: string;
  title: string;
  project: string;
  isActive: boolean;
  startTime?: number;
};

export interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void;
}
