import AbstractView from '../framework/view/abstract-view.js';

function createBlockFilterElement() {
  const blockElement = document.createDocumentFragment();

  const div = document.createElement('div');
  div.classList.add('element-block');

  return blockElement.appendChild(div);
}

function createTaskFilterTemplate() {
  return `
    <div class="tasks-filter">
      <label class="tasks-filter-is-done">
        <input type="checkbox" class="tasks-filter-is-done-input">
        <div class="tasks-filter-is-done-switcher"></div>
        <div class="tasks-filter-is-done-title">Скрыть выполненные задачи</div>
      </label>
    </div>
  `;
}

export default class TaskFilterView extends AbstractView {
  #taskFilterCheckboxElement = this.element.querySelector('.tasks-filter-is-done-input');
  #filterTasks = null;
  #blockElement = null;
  #blockQueueCount = 0;

  constructor({ onFilterTasks }) {
    super();

    this.#filterTasks = onFilterTasks;

    this.#taskFilterCheckboxElement.addEventListener('change', this.#taskFilterClickHandler);
  }

  get template() {
    return createTaskFilterTemplate();
  }

  get checked() {
    return this.#taskFilterCheckboxElement.checked;
  }

  blockFilter() {
    this.#blockQueueCount++;

    if (this.#blockQueueCount < 2) { // todo Вынести в константы
      this.#blockElement = createBlockFilterElement();
      this.element.appendChild(this.#blockElement);
    }
  }

  unblockFilter() {
    if (this.#blockQueueCount < 2) { // todo Вынести в константы
      this.element.removeChild(this.#blockElement);
      this.#blockElement = null;
    }

    this.#blockQueueCount--;
  }

  #taskFilterClickHandler = (e) => {
    this.#filterTasks({ taskFilterChecked: e.target.checked });
  };
}
