import { IntervalModel } from './IntervalModel.js';

interface IntervalData {
  id: string;
  name: string;
  duration: number;
}

type IntervalCollectionData = Array<IntervalData>;

export class IntervalCollection {
  private _intervals: Array<IntervalModel> = [];

  constructor(intervalCollectionData?: IntervalCollectionData) {
    this._intervals = intervalCollectionData.map(
      (dataItem) =>
        new IntervalModel(dataItem.id, dataItem.name, dataItem.duration),
    );
  }

  get intervals() {
    return this._intervals;
  }

  get(id: string) {
    return this.intervals.find((interval) => interval.id === id);
  }

  getNext(id?: string) {
    if (!id) return this.intervals[0];

    for (const [index, interval] of this.intervals.entries()) {
      if (interval.id === id) {
        if (index + 1 >= this.intervals.length) return this.intervals[0];
        return this.intervals[index + 1];
      }
    }
  }

  add(name: string, durationMinutes: number) {
    this._intervals.push(
      IntervalModel.fromNameAndDuration(name, durationMinutes),
    );
  }

  remove(id: string) {
    this._intervals = this._intervals.filter((interval) => interval.id !== id);
  }

  valueOf() {
    return this._intervals.map((interval) => interval.valueOf());
  }
}
