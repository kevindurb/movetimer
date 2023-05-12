import { IntervalController } from './IntervalController.js';
import { TimerController } from './TimerController.js';
import { IntervalCollection } from './IntervalCollection.js';
import { TimerModel } from './TimerModel.js';
import { Storage } from './Storage.js';

const intervalsStorage = new Storage('intervals', []);
const timerStorage = new Storage('timer', {});

const collection = new IntervalCollection(intervalsStorage.load());
const timerModel = new TimerModel(timerStorage.load());

new IntervalController(collection);
new TimerController(collection, timerModel);

window.onunload = () => {
  intervalsStorage.save(collection);
  timerStorage.save(timerModel);
};
