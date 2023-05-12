import { IntervalCollection } from './IntervalCollection.js';
import { getElementById } from './util.js';
import { TimerModel } from './TimerModel.js';

export class TimerController {
  private $timeRemaining = getElementById('time-remaining');
  private $currentIntervalName = getElementById('current-interval-name');
  private $startStopButton = getElementById('start-stop-button');
  private $pauseButton = getElementById('pause-button');
  private $nextButton = getElementById('next-button');

  constructor(
    private collection: IntervalCollection,
    private timerModel: TimerModel,
  ) {
    setInterval(() => this.renderTimer(), 100);

    this.$startStopButton.addEventListener('click', this.handleStartStopClick);
    this.$pauseButton.addEventListener('click', this.handlePauseClick);
    this.$nextButton.addEventListener('click', () => this.loadNextInterval());
    this.timerModel.addOnEndListener(() => this.handleOnIntervalEnd());
  }

  private requestNotificationPermissions() {
    Notification.requestPermission();
  }

  private notify() {
    const currentIntervalId = this.timerModel.getCurrentIntervalId();
    if (currentIntervalId) {
      const currentInterval = this.collection.get(currentIntervalId);
      console.log('notify');
      new Notification(currentInterval.name, {
        body: this.timerModel.getFormattedTimeRemaining(),
      });
    }
  }

  private handleOnIntervalEnd() {
    this.loadNextInterval();
    this.notify();
    this.updateButtons();
  }

  private loadNextInterval() {
    if (!this.timerModel.getCurrentIntervalId()) {
      const [firstInterval] = this.collection.intervals;
      if (firstInterval) {
        this.timerModel.load(firstInterval);
        this.timerModel.resume();
      }
    }

    const next = this.collection.getNext(
      this.timerModel.getCurrentIntervalId(),
    );

    if (next) {
      this.timerModel.load(next);
      this.timerModel.resume();
    }
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
        this.$pauseButton.classList.remove('btn-disabled');
        this.$startStopButton.textContent = 'stop';
        this.$startStopButton.classList.remove('btn-success');
        this.$startStopButton.classList.add('btn-danger');
        break;
      case 'stopped':
        this.$pauseButton.setAttribute('disabled', 'disabled');
        this.$pauseButton.classList.add('btn-disabled');
        this.$startStopButton.textContent = 'start';
        this.$startStopButton.classList.remove('btn-danger');
        this.$startStopButton.classList.add('btn-success');
        break;
      case 'paused':
        this.$pauseButton.setAttribute('disabled', 'disabled');
        this.$pauseButton.classList.add('btn-disabled');
        this.$startStopButton.textContent = 'resume';
        this.$startStopButton.classList.remove('btn-danger');
        this.$startStopButton.classList.add('btn-success');
        break;
    }
  }

  private handleStartStopClick = () => {
    this.requestNotificationPermissions();
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
