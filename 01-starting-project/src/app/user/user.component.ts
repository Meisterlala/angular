import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Input() selected: boolean = false;
  @Output() select = new EventEmitter<string>();

  get ImagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onselectedUser() {
    this.select.emit(this.user.id);
  }
}
