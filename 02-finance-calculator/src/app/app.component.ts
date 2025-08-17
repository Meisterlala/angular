import { Component } from '@angular/core';
import { InvestmentResults } from './investment-results/investment-results';
import { UserInput } from './user-input/user-input';
import { Header } from './header/header';
import { UserInputData } from './user-input/user-input.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvestmentResults, UserInput, Header],
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentUserData?: UserInputData;

  onCalculate($event: UserInputData) {
    console.log('onCalculate', $event);
    this.currentUserData = $event;
  }
}
