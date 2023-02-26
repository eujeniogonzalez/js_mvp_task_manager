import AbstractView from '../framework/view/abstract-view.js';

function createLoaderTemplate(colorClass) {
  return `<div class="typing_loader ${colorClass}"></div>`;
}

export default class LoaderView extends AbstractView {
  #loaderColorClass = null;

  constructor({ loaderColorClass }) {
    super();

    this.#loaderColorClass = loaderColorClass;
  }

  get template() {
    return createLoaderTemplate(this.#loaderColorClass);
  }
}
