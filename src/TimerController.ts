import { IntervalCollection } from './IntervalCollection.js';
import { getElementById } from './util.js';

export class TimerController {
  private $timeRemaining = getElementById('time-remaining');
  private $currentIntervalName = getElementById('current-interval-name');
  private $startStopButton = getElementById('start-stop-button');
  private $pauseButton = getElementById('pause-button');

  private endTime: number | undefined;
  private secondsRemaining: number | undefined;
  private currentIntervalId: string | undefined;
  private state: 'stopped' | 'running' | 'paused' = 'stopped';

  constructor(private collection: IntervalCollection) {
    setInterval(() => this.renderTimer(), 100);

    this.$startStopButton.addEventListener('click', this.handleStartStopClick);
    this.$pauseButton.addEventListener('click', this.handlePauseClick);
  }

  private renderTimer() {
    if (this.currentIntervalId) {
      const currentInterval = this.collection.get(this.currentIntervalId);
      this.$timeRemaining.textContent = this.getSecondsRemaining().toFixed(0);
      this.$currentIntervalName.textContent = currentInterval.name;
    } else {
      this.$timeRemaining.textContent = '';
      this.$currentIntervalName.textContent = '';
    }
  }

  private getSecondsRemaining() {
    if (this.state === 'stopped') return 0;
    if (this.state === 'paused') return this.secondsRemaining;
    return this.endTime - Date.now() / 1000;
  }

  private updateButtons() {
    switch (this.state) {
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

  private startNewTimer() {
    const [firstInterval] = this.collection.intervals;
    if (!firstInterval) return;

    this.currentIntervalId = firstInterval.id;
    this.endTime = Date.now() / 1000 + firstInterval.durationMinutes * 60;
    this.secondsRemaining = undefined;
    this.state = 'running';
    this.updateButtons();
  }

  private resumeTimer() {
    this.endTime = Date.now() / 1000 + this.secondsRemaining;
    this.secondsRemaining = undefined;
    this.state = 'running';
    this.updateButtons();
  }

  private stopTimer() {
    this.currentIntervalId = undefined;
    this.endTime = undefined;
    this.secondsRemaining = undefined;
    this.state = 'stopped';
    this.updateButtons();
  }

  private pauseTimer() {
    this.secondsRemaining = this.endTime - Date.now() / 1000;
    this.endTime = undefined;
    this.state = 'paused';
    this.updateButtons();
  }

  private handleStartStopClick = () => {
    switch (this.state) {
      case 'stopped':
        this.startNewTimer();
        break;
      case 'paused':
        this.resumeTimer();
        break;
      case 'running':
        this.stopTimer();
        break;
    }
  };

  private handlePauseClick = () => {
    this.pauseTimer();
  };
}
