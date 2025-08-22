import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'confirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  query = input('myapp', { alias: 'appSafeLink' });
  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  confirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      // Add tracking to link
      this.hostElement.nativeElement.href += ` `;
      (event.target! as HTMLAnchorElement).href += `?from=${this.query()}`;
      return;
    }
    event.preventDefault();
  }
}
