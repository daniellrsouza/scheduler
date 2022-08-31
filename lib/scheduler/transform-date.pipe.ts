import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  transform(hour: string): string {
    const [day, month, year] = hour.split('/');

    if (!day || !month || !year) {
      return hour;
    }

    const date = new Date();
    date.setDate(Number(day));
    date.setMonth(Number(month));
    date.setFullYear(Number(year));
    return date.toISOString();
  }

}
