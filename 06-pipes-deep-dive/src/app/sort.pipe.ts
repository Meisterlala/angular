import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure: true,
})
export class SortPipe implements PipeTransform {
  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    const sorted = [...value];
    sorted.sort((a, b) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      } else if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      return 0; // Handle mixed types or unsupported types
    });

    if (direction === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }
}
