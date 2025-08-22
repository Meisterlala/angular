import { Component, input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  data = input.required<Ticket>();
  detailsVisible = signal(false);
  close = output();

  toggleDetails() {
    this.detailsVisible.update((old) => !old);
  }

  markAsCompleted() {
    this.close.emit();
  }
}
