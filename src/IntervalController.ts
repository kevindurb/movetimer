import type { IntervalsModel, Interval } from './IntervalsModel.js';
import { getElementById } from './util.js';

export class IntervalController {
  private $intervalList = getElementById<HTMLDivElement>('interval-list');
  private $addIntervalButton = getElementById<HTMLButtonElement>(
    'add-interval-button',
  );
  private $intervalItemTemplate = getElementById<HTMLTemplateElement>(
    'interval-item-template',
  );

  constructor(private model: IntervalsModel) {
    this.$addIntervalButton.addEventListener('click', this.handleAddInterval);
    this.renderIntervals();
  }

  private renderIntervals() {
    const intervals = this.model.intervals;
    this.$intervalList.innerHTML = '';

    for (const [index, interval] of intervals.entries()) {
      const $item = this.buildIntervalElement(interval, index);

      this.$intervalList.appendChild($item);
    }
  }

  private buildIntervalElement(interval: Interval, index: number) {
    const $item = (
      this.$intervalItemTemplate.content.cloneNode(true) as DocumentFragment
    ).querySelector('.interval-item') as HTMLDivElement;

    const $id = $item.querySelector('.interval-item-id') as HTMLDivElement;
    const $name = $item.querySelector(
      '.interval-item-name',
    ) as HTMLInputElement;
    const $duration = $item.querySelector(
      '.interval-item-duration',
    ) as HTMLInputElement;
    const $removeButton = $item.querySelector(
      '.interval-item-remove',
    ) as HTMLButtonElement;

    $item.dataset.id = index.toString();
    $id.innerHTML = `#${index}`;
    $name.value = interval.name;
    $duration.value = interval.durationMinutes.toString();
    $removeButton.dataset.id = index.toString();
    $removeButton.addEventListener('click', this.handleItemRemove);

    $name.addEventListener('blur', this.handleUpdateName);
    $duration.addEventListener('blur', this.handleUpdateDuration);

    return $item;
  }

  private handleAddInterval = () => {
    this.model.push('New Interval', 30);
    this.model.save();
    this.renderIntervals();
  };

  private findIntervalItem = (child: HTMLElement) => {
    const parent = child.closest('.interval-item');

    if (!parent) throw new Error('couldnt find interval item parent');

    return parent as HTMLDivElement;
  };

  private getIntervalItemId = (child: HTMLElement) => {
    const $intervalItem = this.findIntervalItem(child);
    const id = $intervalItem.dataset.id;
    if (!id) throw new Error('id not found');

    return parseInt(id);
  };

  private handleItemRemove = (event: MouseEvent) => {
    const id = this.getIntervalItemId(event.currentTarget as HTMLElement);
    this.model.remove(id);
    this.model.save();
    this.renderIntervals();
  };

  private handleUpdateName = (event: KeyboardEvent) => {
    const $input = event.currentTarget as HTMLInputElement;
    const id = this.getIntervalItemId($input);
    const interval = this.model.get(id);
    interval.name = $input.value;

    this.model.save();
    this.renderIntervals();
  };

  private handleUpdateDuration = (event: KeyboardEvent) => {
    const $input = event.currentTarget as HTMLInputElement;
    const id = this.getIntervalItemId($input);
    const interval = this.model.get(id);
    interval.durationMinutes = parseInt($input.value);

    this.model.save();
    this.renderIntervals();
  };
}
