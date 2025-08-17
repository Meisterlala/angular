import { Component } from '@angular/core';

import { DUMMY_USERS } from '../dummy-users';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  standalone: false,
  // imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selestedUserId?: string;

  get selectedUser(): User | undefined {
    return this.users.find((user) => user.id === this.selestedUserId);
  }

  onSelectUser(id: string) {
    this.selestedUserId = id;
    console.log(`user with ${id}`);
  }
}
