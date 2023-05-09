import { IntervalController } from './IntervalController.js';
import { IntervalsModel } from './IntervalsModel.js';

const intervalsModel = new IntervalsModel();
intervalsModel.load();
const intervalController = new IntervalController(intervalsModel);
