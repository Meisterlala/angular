import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  private statusInterval?: ReturnType<typeof setInterval>;

  constructor() {}

  ngOnInit() {
    this.statusInterval = setInterval(() => {
      const rnd = Math.floor(Math.random() * 3);
      this.currentStatus = (['online', 'offline', 'unknown'] as const)[rnd];
    }, 5000);
  }

  ngOnDestroy(): void {
    if this.statusInterval {
      clearInterval(this.statusInterval);
    }
  }
}
