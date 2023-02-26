import MainView from '../view/main-view.js';
import TasksPresenter from './tasks-presenter.js';
import TaskFilterPresenter from './task-filter-presenter.js';
import NewTaskPresenter from './new-task-presenter.js';

export default class MainPresenter {
  #mainView = null;
  #bodyElement = null;
  #tasksPresenter = null;
  #tasksListContainerElement = null;
  #tasksControlElement = null;
  #taskFilterPresenter = null;
  #newTaskPresenter = null;

  constructor({ bodyElement, tasksModel }) {
    this.#bodyElement = bodyElement;
    this.#mainView = new MainView({ bodyElement: this.#bodyElement });
    this.#tasksListContainerElement = this.#mainView.element.querySelector('.tasks-list');

    this.#tasksControlElement = this.#mainView.element.querySelector('.tasks-control');

    this.#tasksPresenter = new TasksPresenter({
      tasksModel,
      tasksListContainerElement: this.#tasksListContainerElement
    });

    this.#taskFilterPresenter = new TaskFilterPresenter({
      tasksControlElement: this.#tasksControlElement,
      tasksModel,
      tasksPresenter: this.#tasksPresenter
    });

    this.#newTaskPresenter = new NewTaskPresenter({
      tasksControlElement: this.#tasksControlElement,
      tasksModel,
      tasksPresenter: this.#tasksPresenter,
      taskFilterPresenter: this.#taskFilterPresenter
    });
  }

  init() {
    this.#mainView.render();

    this.#taskFilterPresenter.render();

    this.#newTaskPresenter.render();

    this.#tasksPresenter.setTaskFilterPresenter({ taskFilterPresenter: this.#taskFilterPresenter });
    this.#tasksPresenter.renderTasks();
  }
}
