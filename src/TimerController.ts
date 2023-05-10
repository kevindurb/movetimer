import { IntervalCollection } from './IntervalCollection.js';
import { getElementById } from './util.js';
import { TimerModel } from './TimerModel.js';

export class TimerController {
  private $timeRemaining = getElementById('time-remaining');
  private $currentIntervalName = getElementById('current-interval-name');
  private $startStopButton = getElementById('start-stop-button');
  private $pauseButton = getElementById('pause-button');

  constructor(
    private collection: IntervalCollection,
    private timerModel: TimerModel,
  ) {
    setInterval(() => this.renderTimer(), 100);

    this.$startStopButton.addEventListener('click', this.handleStartStopClick);
    this.$pauseButton.addEventListener('click', this.handlePauseClick);
  }

  private renderTimer() {
    const currentIntervalId = this.timerModel.getCurrentIntervalId();
    if (currentIntervalId) {
      const currentInterval = this.collection.get(currentIntervalId);
      this.$timeRemaining.textContent =
        this.timerModel.getFormattedTimeRemaining();
      this.$currentIntervalName.textContent = currentInterval.name;
    } else {
      this.$timeRemaining.textContent = '';
      this.$currentIntervalName.textContent = '';
    }
  }

  private updateButtons() {
    switch (this.timerModel.getState()) {
      case 'running':
        this.$pauseButton.removeAttribute('disabled');
        this.$startStopButton.textContent = 'stop';
        this.$startStopButton.classList.remove('btn-success');
        this.$startStopButton.classList.add('btn-danger');
        break;
      case 'stopped':
        this.$pauseButton.setAttribute('disabled', 'disabled');
        this.$startStopButton.textContent = 'start';
        this.$startStopButton.classList.remove('btn-danger');
        this.$startStopButton.classList.add('btn-success');
        break;
      case 'paused':
        this.$pauseButton.setAttribute('disabled', 'disabled');
        this.$startStopButton.textContent = 'resume';
        this.$startStopButton.classList.remove('btn-danger');
        this.$startStopButton.classList.add('btn-success');
        break;
    }
  }

  private handleStartStopClick = () => {
    switch (this.timerModel.getState()) {
      case 'stopped':
        const [firstInterval] = this.collection.intervals;
        if (firstInterval) {
          this.timerModel.load(firstInterval);
          this.timerModel.resume();
        }
        break;
      case 'paused':
        this.timerModel.resume();
        break;
      case 'running':
        this.timerModel.stop();
        break;
    }

    this.updateButtons();
  };

  private handlePauseClick = () => {
    this.timerModel.pause();
    this.updateButtons();
  };
}
