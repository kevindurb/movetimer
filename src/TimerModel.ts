import { IntervalModel } from './IntervalModel.js';

export class TimerModel {
  private endTime: number | undefined;
  private secondsRemaining: number | undefined;
  private currentIntervalId: string | undefined;
  private state: 'stopped' | 'running' | 'paused' = 'stopped';
  private onEndTimeout: number | undefined;
  private onEndListeners: Array<() => void> = [];

  private getNowSeconds() {
    return Date.now() / 1000;
  }

  private handleOnEnd() {
    this.stop();
    this.onEndListeners.forEach((cb) => cb());
  }

  addOnEndListener(cbToAdd: () => void) {
    this.onEndListeners.push(cbToAdd);
  }

  removeOnEndListener(cbToRemove: () => void) {
    this.onEndListeners = this.onEndListeners.filter((cb) => cb !== cbToRemove);
  }

  load(interval: IntervalModel) {
    clearTimeout(this.onEndTimeout);
    this.currentIntervalId = interval.id;
    this.endTime = undefined;
    this.secondsRemaining = interval.duration;
    this.state = 'paused';
  }

  stop() {
    clearTimeout(this.onEndTimeout);
    this.endTime = undefined;
    this.secondsRemaining = undefined;
    this.state = 'stopped';
  }

  pause() {
    clearTimeout(this.onEndTimeout);
    this.secondsRemaining = this.endTime - this.getNowSeconds();
    this.endTime = undefined;
    this.state = 'paused';
  }

  resume() {
    clearTimeout(this.onEndTimeout);
    this.onEndTimeout = setTimeout(
      () => this.handleOnEnd(),
      this.secondsRemaining * 1000,
    );

    this.endTime = this.getNowSeconds() + this.secondsRemaining;
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
    return this.endTime - this.getNowSeconds();
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
