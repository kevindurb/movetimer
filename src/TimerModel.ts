import { IntervalModel } from './IntervalModel.js';

export class TimerModel {
  private endTime: number | undefined;
  private secondsRemaining: number | undefined;
  private currentIntervalId: string | undefined;
  private state: 'stopped' | 'running' | 'paused' = 'stopped';

  private getNowSeconds() {
    return Date.now() / 1000;
  }

  load(interval: IntervalModel) {
    this.currentIntervalId = interval.id;
    this.endTime = undefined;
    this.secondsRemaining = interval.duration;
    this.state = 'paused';
  }

  stop() {
    this.currentIntervalId = undefined;
    this.endTime = undefined;
    this.secondsRemaining = undefined;
    this.state = 'stopped';
  }

  pause() {
    this.secondsRemaining = this.endTime - Date.now() / 1000;
    this.endTime = undefined;
    this.state = 'paused';
  }

  resume() {
    this.endTime = Date.now() / 1000 + this.secondsRemaining;
    this.secondsRemaining = undefined;
    this.state = 'running';
  }

  getState() {
    return this.state;
  }

  getCurrentIntervalId() {
    return this.currentIntervalId;
  }

  getSecondsRemaining() {
    if (this.state === 'stopped') return 0;
    if (this.state === 'paused') return this.secondsRemaining;
    return this.endTime - Date.now() / 1000;
  }

  getFormattedTimeRemaining() {
    const secondsRemaining = this.getSecondsRemaining();
    const minutes = Math.floor(secondsRemaining / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(secondsRemaining % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
