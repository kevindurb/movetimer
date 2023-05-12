export class Storage {
  save(model: object) {
    window.localStorage.setItem('intervals', JSON.stringify(model.valueOf()));
  }

  load() {
    try {
      return JSON.parse(window.localStorage.getItem('intervals')) ?? [];
    } catch (e) {
      return [];
    }
  }
}
