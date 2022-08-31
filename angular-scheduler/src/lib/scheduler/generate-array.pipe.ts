import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generateArray'
})
export class GenerateArrayPipe implements PipeTransform {

  transform(value: number): any[] {
    return Array.from({ length: value });
  }

}
