export class Storage<ValueType> {
  constructor(private key: string, private defaultValue: ValueType) {}

  save(model: { valueOf: () => ValueType }) {
    window.localStorage.setItem(this.key, JSON.stringify(model.valueOf()));
  }

  load(): ValueType {
    try {
      return (
        JSON.parse(window.localStorage.getItem(this.key)) ?? this.defaultValue
      );
    } catch (e) {
      return this.defaultValue;
    }
  }
}
