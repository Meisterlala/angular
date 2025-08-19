import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
})
export class DashboardItemComponent {
  @Input({ required: true }) image!: { src: string; alt: string };

  // "new" way to request an input
  title = input.required<string>();
}
