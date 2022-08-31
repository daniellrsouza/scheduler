import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type HourTimeline = {
  index: number;
  label: string;
}

type SlotItemObject = {
  title: string;
  subtitle: string;
  style?: Record<string, any>;
  visible?: boolean;
}

export type RowObject = {
  hour: string;
  items: SlotItemObject[];
}

export type RowsWithDaysObject = {
  day: string;
  description?: string;
  rows: RowObject[];
}

export type SchedulerOutputEvent = {
  row: number;
  column: number;
  rows: RowsWithDaysObject | RowsWithDaysObject[];
  slotClicked?: SlotItemObject | RowsWithDaysObject;
  single?: boolean;
}

export const isRowObject =
  (obj: any): obj is RowsWithDaysObject => !Array.isArray(obj);

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  @Input() data: RowsWithDaysObject | RowsWithDaysObject[] = [];
  @Input() initialHour = 0;
  @Output() clickEmitter = new EventEmitter<SchedulerOutputEvent>();
  @Output() selectedDayEmitter = new EventEmitter<SchedulerOutputEvent>();

  config = {
    hours: 24,
    interval: 1,
  };

  timeline: HourTimeline[] = [];

  constructor() { }

  get rowsObj(): RowsWithDaysObject {
    return this.data as RowsWithDaysObject;
  }

  get rowsArr(): RowsWithDaysObject[] {
    return this.data as RowsWithDaysObject[];
  }

  get isSingle(): boolean {
    return isRowObject(this.data);
  }

  get maxCols(): number {
    if (isRowObject(this.data)) {
      const totalItems = this.data.rows.map((s: any) => s.items.length);
      return Math.max(...totalItems);
    } else {
      const totalItems = this.data.flatMap((s: any) => s.rows.map((i: any) => i.items.length));
      return Math.max(...totalItems);
    }
  }

  transformDate(hour: string) {
    const [day, month, year] = hour.split('/');
    const date = new Date();
    date.setDate(Number(day));
    date.setMonth(Number(month));
    date.setFullYear(Number(year));
    return date.toISOString();
  }

  ngOnInit(): void {
    this.createTimeline();
  }

  createTimeline() {
    const min = this.initialHour;
    const max = this.config.hours;
    const iter = Array.from({ length: this.config.hours });

    iter.forEach((_, idx) => {
      let count = min + (idx * this.config.interval);
      if (count < max) {
        const hour = `${count}:00`;
        this.timeline.push({ label: hour, index: idx })
      }
    });
  }

  handleClick(index: number, row: number, slot?: SlotItemObject | RowsWithDaysObject) {
    const column = index % 3;
    const event = {
      row,
      column,
      rows: this.data,
      slotClicked: slot,
      single: this.isSingle
    }

    console.log(event);

    if (this.isSingle) {
      (slot as SlotItemObject).visible = !(slot as SlotItemObject).visible;
    }

    this.clickEmitter.emit(event);
  }

  selectDay(index: number, row: number, slot: RowsWithDaysObject) {
    this.handleClick(index, row, slot);
    this.data = (this.data as RowsWithDaysObject[]).find((s: RowsWithDaysObject) => s.day === slot.day)!;
  }

}
