import AbstractView from '../framework/view/abstract-view.js';
import { removeHashSymbol } from '../utils.js';
import { TASK_ACTIONS, TASK_STATUSES } from '../const.js';

function createBlockTaskElement() {
  const blockElement = document.createDocumentFragment();

  const div = document.createElement('div');
  div.classList.add('element-block');

  return blockElement.appendChild(div);
}

function getTaskStatus(status) {
  return status ? TASK_STATUSES.CLOSED : TASK_STATUSES.ACTIVE;
}

function getTaskHash(status) {
  return status ? TASK_ACTIONS.HASHES.OPEN : TASK_ACTIONS.HASHES.CLOSE;
}

function getTaskAnchor(status) {
  return status ? TASK_ACTIONS.ANCHORS.OPEN : TASK_ACTIONS.ANCHORS.CLOSE;
}

function getClosedTaskClass(status) {
  return status ? 'closed-task' : '';
}

function createTaskTemplate(task) {
  return `
    <div class="task-item ${getClosedTaskClass(task.isDone)}">
      <div class="task-date-time">
        <div class="task-date">${task.date}</div>
        <div class="task-time">${task.time}</div>
      </div>

      <div class="task-description ${getClosedTaskClass(task.isDone)}">${task.description}</div>

      <div class="task-status">${getTaskStatus(task.isDone)}</div>

      <div class="task-close-open">
        <a
          href="#${getTaskHash(task.isDone)}"
          class="task-close-open-link"
        >
          ${getTaskAnchor(task.isDone)}
        </a>
      </div>
    </div>
  `;
}

export default class TaskView extends AbstractView {
  #task = null;
  #changeTaskStatus = null;
  #blockElement = null;
  #taskCloseOpenLink = null;
  #taskDescription = null;
  #taskStatus = null;

  constructor({ task, onTaskStatusChange }) {
    super();

    this.#task = task;
    this.#changeTaskStatus = onTaskStatusChange;

    this.#taskCloseOpenLink = this.element.querySelector('.task-close-open-link');
    this.#taskDescription = this.element.querySelector('.task-description');
    this.#taskStatus = this.element.querySelector('.task-status');

    this.#taskCloseOpenLink.addEventListener('click', this.#changingTaskStatusHandler);
  }

  get template() {
    return createTaskTemplate(this.#task);
  }

  #changingTaskStatusHandler = async (e) => {
    e.preventDefault();

    this.#blockTask();
    this.#setTaskAnchor(TASK_ACTIONS.ANCHORS.LOADING);

    const action = removeHashSymbol(e.target.hash);
    const updatedTask = await this.#changeTaskStatus({ action, id: this.#task.id, element: this.element });

    this.#setNewTaskStatus(updatedTask.isDone);

    this.#unblockTask();
  };

  #blockTask() {
    this.#blockElement = createBlockTaskElement();
    this.element.appendChild(this.#blockElement);
  }

  #unblockTask() {
    this.element.removeChild(this.#blockElement);
    this.#blockElement = null;
  }

  #setNewTaskStatus(status) {
    this.#setTaskAnchor(getTaskAnchor(status));
    this.#setTaskHash(getTaskHash(status));
    this.#setTaskStatus(getTaskStatus(status));
    this.#changeTaskClasses(getClosedTaskClass(status));
  }

  #setTaskAnchor(anchor) {
    this.#taskCloseOpenLink.innerHTML = anchor;
  }

  #setTaskHash(hash) {
    this.#taskCloseOpenLink.hash = `#${hash}`;
  }

  #setTaskStatus(status) {
    this.#taskStatus.innerHTML = status;
  }

  #changeTaskClasses(className) {
    if (className) {
      this.element.classList.add('closed-task');
      this.#taskDescription.classList.add('closed-task');
    } else {
      this.element.classList.remove('closed-task');
      this.#taskDescription.classList.remove('closed-task');
    }
  }
}
