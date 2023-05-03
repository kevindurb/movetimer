import { IntervalController } from './IntervalController.js';
import { IntervalsModel } from './IntervalsModel.js';

const intervalsModel = new IntervalsModel();
const intervalController = new IntervalController(intervalsModel);
