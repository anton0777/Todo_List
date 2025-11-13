import { DateTime } from 'effect/DateTime';

export type Task = {
  id: number;
  title: string;
  description: string | null;
  done: boolean;
  parentId: number | null;
  userId: number;
  createdAt: DateTime;
  subtasks?: Task[];
};

export type TaskResponse = {
  id: number;
  title: string;
  description: string | null;
  done: boolean;
  parentId: number | null;
  createdAt: DateTime;
  subtasks?: Task[];
};

export type CreateTask = {
  title: string;
  description: string | null;
  done?: boolean;
  parentId?: number | null;
};

export type UpdateTask = {
  title?: string;
  description?: string | null;
  done?: boolean;
};
