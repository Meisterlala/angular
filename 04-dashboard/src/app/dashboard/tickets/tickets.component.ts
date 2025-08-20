import { Component } from '@angular/core';
import { TicketComponent } from './ticket/ticket.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TicketComponent, NewTicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {}
