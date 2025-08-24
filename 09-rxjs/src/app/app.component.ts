import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // Signal to Observable
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  // Observable to Signal
  interval$ = interval(1000);
  interval = toSignal(this.interval$, { initialValue: 0 });

  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
  }

  ngOnInit(): void {
    // const s = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => {
    //       console.log(val);
    //     },
    //   });
    // this.destroyRef.onDestroy(() => {
    //   s.unsubscribe();
    // });

    const s2 = this.clickCount$.subscribe({
      next: (val) => {
        console.log(val);
      },
    });
    this.destroyRef.onDestroy(() => {
      s2.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((old) => old + 1);
  }
}
