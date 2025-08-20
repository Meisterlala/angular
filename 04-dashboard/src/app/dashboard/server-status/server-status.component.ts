import { Component, DestroyRef, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  private destroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit() {
    const s = setInterval(() => {
      const rnd = Math.floor(Math.random() * 3);
      this.currentStatus = (['online', 'offline', 'unknown'] as const)[rnd];
    }, 5000);
    this.destroyRef.onDestroy(() => {
      clearInterval(s);
    });
  }
}
