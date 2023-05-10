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
    setInterval(() => this.renderTimer(), 1000);

    this.$startStopButton.addEventListener('click', this.handleStartStopClick);
    this.$pauseButton.addEventListener('click', this.handlePauseClick);

    console.log(this.$startStopButton);
  }

  private renderTimer() {
    if (!this.currentIntervalId) return;

    const currentInterval = this.collection.get(this.currentIntervalId);

    this.$timeRemaining.textContent = this.getSecondsRemaining().toFixed(0);
    this.$currentIntervalName.textContent = currentInterval.name;
  }

  private getSecondsRemaining() {
    if (this.state === 'stopped') return 0;

    if (this.state === 'paused') return this.secondsRemaining;

    return this.endTime - Date.now() / 1000;
  }

  private startNewTimer() {
    const [firstInterval] = this.collection.intervals;
    if (!firstInterval) return;

    console.log('starting');

    this.currentIntervalId = firstInterval.id;
    this.endTime = Date.now() / 1000 + firstInterval.durationMinutes * 60;
    this.secondsRemaining = undefined;
    this.state = 'running';
    this.$pauseButton.removeAttribute('disabled');
  }

  private resumeTimer() {
    console.log('resuming');
    this.endTime = Date.now() / 1000 + this.secondsRemaining;
    this.secondsRemaining = undefined;
    this.state = 'running';
    this.$pauseButton.removeAttribute('disabled');
  }

  private stopTimer() {
    console.log('stopping');
    this.currentIntervalId = undefined;
    this.endTime = undefined;
    this.secondsRemaining = undefined;
    this.state = 'stopped';
    this.$pauseButton.setAttribute('disabled', 'disabled');
  }

  private pauseTimer() {
    console.log('pausing');
    this.secondsRemaining = this.endTime - Date.now() / 1000;
    this.endTime = undefined;
    this.state = 'paused';
    this.$pauseButton.setAttribute('disabled', 'disabled');
  }

  private handleStartStopClick = () => {
    if (this.state === 'stopped') {
      this.startNewTimer();
    } else if (this.state === 'paused') {
      this.resumeTimer();
    } else if (this.state === 'running') {
      this.stopTimer();
    }
  };

  private handlePauseClick = () => {
    this.pauseTimer();
  };
}
