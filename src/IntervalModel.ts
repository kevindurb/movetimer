export class IntervalModel {
  constructor(
    private _id: string,
    private _name: string,
    private _durationMinutes: number,
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

  get durationMinutes() {
    return this._durationMinutes;
  }

  set durationMinutes(durationMinutes: number) {
    this._durationMinutes = durationMinutes;
  }

  toJSON() {
    const { id, name, durationMinutes } = this;
    return {
      id,
      name,
      durationMinutes,
    };
  }

  static fromJSON(data: { id: string; name: string; durationMinutes: number }) {
    return new IntervalModel(data.id, data.name, data.durationMinutes);
  }

  static fromNameAndDuration(name: string, durationMinutes: number) {
    return new IntervalModel(crypto.randomUUID(), name, durationMinutes);
  }
}
