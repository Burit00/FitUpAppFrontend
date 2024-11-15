export type TimeSpanString = `${number}${number}:${number}${number}:${number}${number}`;

const maxHours = 99;
const minutesInHour = 60;
const secondsInMinute = 60;

export class TimeSpan {
  constructor();

  constructor(date: Date);

  constructor(timeSpan: TimeSpan);

  constructor(timeSpan: TimeSpanString);

  constructor(hours: number, minutes?: number, seconds?: number);

  constructor(
    hoursOrTimeSpanOrDate: number | TimeSpan | TimeSpanString | Date = 0,
    minutes: number = 0,
    seconds: number = 0,
  ) {
    if (hoursOrTimeSpanOrDate instanceof Date) {
      this.fromDateConstructor(hoursOrTimeSpanOrDate);

      return;
    }
    if (hoursOrTimeSpanOrDate instanceof TimeSpan) {
      this.fromTimeSpanConstructor(hoursOrTimeSpanOrDate);

      return;
    }
    if (typeof hoursOrTimeSpanOrDate === 'string') {
      this.fromTimeSpanStringConstructor(hoursOrTimeSpanOrDate);

      return;
    }

    this.hours = hoursOrTimeSpanOrDate;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  private _hours: number = 0;

  public get hours(): number {
    return this._hours;
  }

  public set hours(hours: number) {
    let value = hours ?? 0;
    if (value < 0) value = 0;
    else if (value > maxHours) value = maxHours;
    this._hours = value;
  }

  private _minutes: number = 0;

  public get minutes(): number {
    return this._minutes;
  }

  public set minutes(value: number) {
    let minutes = value ?? 0;
    if (minutes < 0) minutes = 0;
    else if (minutes >= minutesInHour) {
      const allMinutes = minutes;
      minutes = minutes % minutesInHour;
      this.hours = this.hours + (allMinutes - minutes) / minutesInHour;
    }
    this._minutes = minutes;
  }

  private _seconds: number = 0;

  public get seconds(): number {
    return this._seconds;
  }

  public set seconds(value: number) {
    let seconds = value ?? 0;
    if (seconds < 0) seconds = 0;
    else if (seconds >= secondsInMinute) {
      const allSeconds = seconds;
      seconds = seconds % minutesInHour;
      this.minutes = this.minutes + (allSeconds - seconds) / secondsInMinute;
    }
    this._seconds = seconds;
  }

  public toString(): string {
    const time = [this._hours, this._minutes, this._seconds];
    const [hours, minutes, seconds] = time.map((value: number) => value.toString().padStart(2, '0'));

    return `${hours}:${minutes}:${seconds}`;
  }

  private fromDateConstructor(date: Date): void {
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
  }

  private fromTimeSpanStringConstructor(timeSpan: TimeSpanString): void {
    const [hours, minutes, seconds] = timeSpan.split(':').map(Number);

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  private fromTimeSpanConstructor(timeSpan: TimeSpan): void {
    this.hours = timeSpan.hours;
    this.minutes = timeSpan.minutes;
    this.seconds = timeSpan.seconds;
  }
}
