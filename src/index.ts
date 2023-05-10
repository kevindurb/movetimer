import { IntervalController } from './IntervalController.js';
import { TimerController } from './TimerController.js';
import { IntervalCollection } from './IntervalCollection.js';

const collection = new IntervalCollection();
collection.load();
const intervalController = new IntervalController(collection);
const timerController = new TimerController(collection);
