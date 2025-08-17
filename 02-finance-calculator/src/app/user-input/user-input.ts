import { Component, EventEmitter, Output } from '@angular/core';
import { UserInputData } from './user-input.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css',
})
export class UserInput {
  @Output() calculate = new EventEmitter<UserInputData>();

  initalInvestment?: string;
  annualInvestment?: string;
  expectedReturn?: string;
  duration?: string;

  onSubmit() {
    this.calculate.emit({
      duration: parseInt(this.duration || ''),
      return: parseInt(this.expectedReturn || ''),
      annual: parseInt(this.annualInvestment || ''),
      inital: parseInt(this.initalInvestment || ''),
    });
  }
}
