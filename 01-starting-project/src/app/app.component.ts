import { Component } from '@angular/core';

import { HeaderComponent } from './header/header';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from '../dummy-users';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selestedUserId: string = 'u1';

  get selectedUser() {
    return this.users.find((user) => user.id === this.selestedUserId)!;
  }

  onSelectUser(id: string) {
    this.selestedUserId = id;
    console.log(`user with ${id}`);
  }
}
