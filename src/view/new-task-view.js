import AbstractView from '../framework/view/abstract-view.js';

function createNewTaskTemplate() {
  return `
    <div class="new-task-form-container">
      <form class="new-task-form">
        <input
          id="new-task-text"
          class="new-task-text input_text width_500"
          type="text"
          placeholder="Новая задача"
          autofocus
          autocomplete="off"
        />

        <button
          id="new-task-submit"
          class="new-task-submit input_submit width_250"
          type="submit"
        >
          Создать задачу
        </button>
      </form>
    </div>
  `;
}

export default class NewTaskView extends AbstractView {
  #newTaskElement = this.element.querySelector('#new-task-text');
  #newTaskButton = this.element.querySelector('#new-task-submit');
  #createTask = null;
  #loaderView = null;
  #creatingTasksCount = 0;

  constructor({ onTaskCreate, loaderView }) {
    super();

    this.#createTask = onTaskCreate;
    this.#loaderView = loaderView;

    this.#newTaskButton.addEventListener('click', this.#creatingNewTaskHandler);
  }

  get template() {
    return createNewTaskTemplate();
  }

  #creatingNewTaskHandler = async (e) => {
    e.preventDefault();

    if (!this.#newTaskElement.value) {
      this.shake();
      return;
    }

    const taskText = this.#newTaskElement.value;

    this.#creatingTasksCount++;

    this.#removeButtonText();
    this.#addLoaderToButton();
    this.#clearNewTaskInput();

    await this.#createTask({ taskText }); // todo Экранировать введённые данные

    this.#removeLoaderFromButton();
    this.#addButtonText();

    this.#creatingTasksCount--;
  };

  #addLoaderToButton() {
    if (this.#isTaskQueueExist()) {
      return;
    }

    this.#newTaskButton.appendChild(this.#loaderView.element);
  }

  #removeLoaderFromButton() {
    if (!this.#isButtonLoaderExist() || this.#isTaskQueueExist()) {
      return;
    }

    this.#newTaskButton.removeChild(this.#loaderView.element);
  }

  #addButtonText() {
    if (this.#isTaskQueueExist()) {
      return;
    }

    this.#newTaskButton.textContent = 'Создать задачу'; // todo Вынести в константы
  }

  #removeButtonText() {
    if (this.#isTaskQueueExist()) {
      return;
    }

    this.#newTaskButton.textContent = '';
  }

  #clearNewTaskInput() {
    this.#newTaskElement.value = '';
  }

  #isButtonLoaderExist() {
    return this.#newTaskButton.contains(this.#loaderView.element);
  }

  #isTaskQueueExist() {
    return this.#creatingTasksCount > 1;
  }
}
