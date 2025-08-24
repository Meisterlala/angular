import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    this.tasks.update((old) => [
      ...old,
      {
        ...taskData,
        id: Math.random().toString(),
        status: 'OPEN',
      },
    ]);
  }

  updateTaskStatus(taskid: String, status: TaskStatus) {
    this.tasks.update((old) =>
      old.map((t) => (t.id === taskid ? { ...t, status: status } : t)),
    );
  }
}
