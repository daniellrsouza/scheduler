export type HourTimeline = {
  index: number;
  label: string;
}

export type SlotItemObject = {
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