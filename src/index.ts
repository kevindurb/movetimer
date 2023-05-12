import { IntervalController } from './IntervalController.js';
import { TimerController } from './TimerController.js';
import { IntervalCollection } from './IntervalCollection.js';
import { TimerModel } from './TimerModel.js';
import { Storage } from './Storage.js';

const storage = new Storage();

const collection = new IntervalCollection(storage.load());
const timerModel = new TimerModel();

new IntervalController(collection);
new TimerController(collection, timerModel);

window.onunload = () => {
  storage.save(collection);
};
