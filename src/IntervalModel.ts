export class IntervalModel {
  constructor(
    private _id: string,
    private _name: string,
    private _duration: number,
  ) {}

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get duration() {
    return this._duration;
  }

  set duration(duration: number) {
    this._duration = duration;
  }

  valueOf() {
    const { id, name, duration } = this;
    return {
      id,
      name,
      duration,
    };
  }

  static fromNameAndDuration(name: string, duration: number) {
    return new IntervalModel(crypto.randomUUID(), name, duration);
  }
}
