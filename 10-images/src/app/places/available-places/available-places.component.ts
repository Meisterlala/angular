import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isLoading = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isLoading.set(true);
    const h = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((res) => res.places))
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        complete: () => {
          this.isLoading.set(false);
        },
        error: (e) => {
          this.error.set(e.Message);
        },
      });
    this.destroyRef.onDestroy(() => {
      h.unsubscribe();
    });
  }
}
