import {
  Component,
  ElementRef,
  output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ControlComponent } from '../../../shared/control/control.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../ticket/ticket.model';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  // 'form' is the template reference
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  add = output<{ title: string; text: string }>();

  addTicket(title: string, text: string) {
    this.add.emit({
      title: title,
      text: text,
    });

    // Reset Form
    this.form().nativeElement.reset();
  }
}
