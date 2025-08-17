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

  initalInvestment: string = '2000';
  annualInvestment: string = '400';
  expectedReturn: string = '3';
  duration: string = '12';

  onSubmit() {
    this.calculate.emit({
      duration: parseInt(this.duration || ''),
      return: parseInt(this.expectedReturn || ''),
      annual: parseInt(this.annualInvestment || ''),
      inital: parseInt(this.initalInvestment || ''),
    });
  }
}
