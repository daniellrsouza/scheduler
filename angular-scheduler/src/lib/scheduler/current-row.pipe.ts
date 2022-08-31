import { Pipe, PipeTransform } from '@angular/core';
import { RowObject } from './scheduler.component';

@Pipe({
  name: 'currentRow'
})
export class CurrentRowPipe implements PipeTransform {

  transform(slots: RowObject[], key: string): RowObject | undefined {
    if (!slots || !key) {
      return undefined;
    }

    if (!slots.length) {
      return undefined;
    }

    return slots.find(s => s.hour === key);
  }

}
