export class Storage {
  constructor(private key: string, private defaultValue: any) {}

  save(model: object) {
    window.localStorage.setItem(this.key, JSON.stringify(model.valueOf()));
  }

  load() {
    try {
      return (
        JSON.parse(window.localStorage.getItem(this.key)) ?? this.defaultValue
      );
    } catch (e) {
      return this.defaultValue;
    }
  }
}
