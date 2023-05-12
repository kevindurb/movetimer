import { IntervalModel } from './IntervalModel.js';

export class IntervalCollection {
  private _intervals: Array<IntervalModel> = [];

  get intervals() {
    return this._intervals;
  }

  get(id: string) {
    return this.intervals.find((interval) => interval.id === id);
  }

  getNext(id: string) {
    for (const [index, interval] of this.intervals.entries()) {
      if (interval.id === id) {
        if (index + 1 >= this.intervals.length) return;
        return this.intervals[index + 1];
      }
    }
  }

  add(name: string, durationMinutes: number) {
    this._intervals.push(
      IntervalModel.fromNameAndDuration(name, durationMinutes),
    );
    this.save();
  }

  remove(id: string) {
    this._intervals = this._intervals.filter((interval) => interval.id !== id);
    this.save();
  }

  load() {
    const data = JSON.parse(window.localStorage.getItem('intervals')) ?? [];
    this._intervals = data.map((dataItem) => IntervalModel.fromJSON(dataItem));
  }

  save() {
    window.localStorage.setItem(
      'intervals',
      JSON.stringify(this._intervals.map((interval) => interval.toJSON())),
    );
  }
}
