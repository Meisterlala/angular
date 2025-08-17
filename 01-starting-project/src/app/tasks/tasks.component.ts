import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { newTask } from './new-task/new-task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;

  constructor(private taksService: TasksService) {}

  newTaskVisible = false;

  get selectedUserTasks() {
    return this.taksService.getUserTask(this.id);
  }
  onComplete(id: string) {
    this.taksService.removeTask(id);
  }

  addTask(data: newTask) {
    this.taksService.addTask(data, this.id);
  }
}
