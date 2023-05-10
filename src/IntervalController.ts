import type { IntervalModel } from './IntervalModel.js';
import type { IntervalCollection } from './IntervalCollection.js';
import { getElementById } from './util.js';

export class IntervalController {
  private $intervalList = getElementById<HTMLDivElement>('interval-list');
  private $addIntervalButton = getElementById<HTMLButtonElement>(
    'add-interval-button',
  );
  private $intervalItemTemplate = getElementById<HTMLTemplateElement>(
    'interval-item-template',
  );

  constructor(private collection: IntervalCollection) {
    this.$addIntervalButton.addEventListener('click', this.handleAddInterval);
    this.renderIntervals();
  }

  private renderIntervals() {
    const intervals = this.collection.intervals;
    this.$intervalList.innerHTML = '';

    for (const [index, interval] of intervals.entries()) {
      const $item = this.buildIntervalElement(interval, index);

      this.$intervalList.appendChild($item);
    }
  }

  private buildIntervalElement(interval: IntervalModel, index: number) {
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

    $item.dataset.id = interval.id;
    $id.innerHTML = `#${index}`;
    $name.value = interval.name;
    $duration.value = interval.durationMinutes.toString();
    $removeButton.addEventListener('click', this.handleItemRemove);

    $name.addEventListener('blur', this.handleUpdateName);
    $duration.addEventListener('blur', this.handleUpdateDuration);

    return $item;
  }

  private handleAddInterval = () => {
    this.collection.add('New Interval', 30);
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

    return id;
  };

  private handleItemRemove = (event: MouseEvent) => {
    const id = this.getIntervalItemId(event.currentTarget as HTMLElement);
    this.collection.remove(id);
    this.renderIntervals();
  };

  private handleUpdateName = (event: KeyboardEvent) => {
    const $input = event.currentTarget as HTMLInputElement;
    const id = this.getIntervalItemId($input);
    const interval = this.collection.get(id);
    interval.name = $input.value;

    this.collection.save();
    this.renderIntervals();
  };

  private handleUpdateDuration = (event: KeyboardEvent) => {
    const $input = event.currentTarget as HTMLInputElement;
    const id = this.getIntervalItemId($input);
    const interval = this.collection.get(id);
    interval.durationMinutes = parseInt($input.value);

    this.collection.save();
    this.renderIntervals();
  };
}
