import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() submit = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.submit.emit({} as Task);
  }
  onCancel() {
    this.cancel.emit();
  }
}
