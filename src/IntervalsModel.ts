export interface Interval {
  name: string;
  durationMinutes: number;
}

export class IntervalsModel {
  private _intervals: Array<Interval> = [];

  get intervals() {
    return this._intervals;
  }

  get(index: number) {
    return this.intervals[index];
  }

  update(index: number, interval: Interval) {
    this._intervals[index] = interval;
  }

  push(name: string, durationMinutes: number) {
    this._intervals.push({ name, durationMinutes });
  }

  remove(indexToRemove: number) {
    this._intervals = this._intervals.filter(
      (interval, index) => index !== indexToRemove,
    );
  }
}
