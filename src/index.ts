import { IntervalController } from './IntervalController.js';
import { TimerController } from './TimerController.js';
import { IntervalCollection } from './IntervalCollection.js';
import { TimerModel } from './TimerModel.js';

const collection = new IntervalCollection();
const timerModel = new TimerModel();

collection.load();

const intervalController = new IntervalController(collection);
const timerController = new TimerController(collection, timerModel);
