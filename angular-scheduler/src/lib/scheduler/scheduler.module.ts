import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CurrentRowPipe } from './current-row.pipe';
import { GenerateArrayPipe } from './generate-array.pipe';
import { SchedulerComponent } from './scheduler.component';
import localePt from '@angular/common/locales/pt';
import { TransformDatePipe } from './transform-date.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    SchedulerComponent,
    GenerateArrayPipe,
    CurrentRowPipe,
    TransformDatePipe
  ],
  imports: [],
  exports: [
    SchedulerComponent,
    GenerateArrayPipe,
    CurrentRowPipe,
    TransformDatePipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class SchedulerModule { }
