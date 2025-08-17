import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HeaderComponent,
    UserComponent,
    TasksComponent,
    SharedModule,
  ],
})
export class AppModule {}
